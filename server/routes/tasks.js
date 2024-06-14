import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.user;
      const { query } = req;
      const {
        executor, status, label, isCreatorUser,
      } = query;
      const tasksQuery = app.objection.models.task.query().withGraphJoined('[status, creator, executor, labels]');

      if (executor) tasksQuery.modify('filterExecutor', executor);
      if (status) tasksQuery.modify('filterStatus', status);
      if (label) tasksQuery.modify('filterLabel', label);
      if (isCreatorUser) tasksQuery.modify('filterCreator', id);

      if (isCreatorUser === 'on') {
        tasksQuery.skipUndefined().modify('filterCreator', id || undefined);
      }

      const tasks = await tasksQuery;
      const users = await app.objection.models.user.query();
      const statuses = await app.objection.models.status.query();
      const labels = await app.objection.models.label.query();

      reply.render('tasks/index', {
        tasks, statuses, users, labels, query,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'newTasks', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      const labels = await app.objection.models.label.query();
      reply.render('tasks/new', {
        task, statuses, users, labels,
      });

      return reply;
    })
    .get('/tasks/:id', { name: 'specificTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id).withGraphFetched('[status, creator, executor, labels]');
      reply.render('tasks/task', { task });

      return reply;
    })
    .post('/tasks', { name: 'createTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id: creatorId } = req.user;
      const task = new app.objection.models.task();
      const {
        name, description, statusId, executorId, labels: labelsList = [],
      } = req.body.data;

      const taskData = {
        name,
        description,
        statusId: Number(statusId),
        creatorId: Number(creatorId),
        executorId: Number(executorId),
      };

      const labelsIds = [...labelsList].map((id) => ({ id: Number(id) }));

      task.$set(req.body.data);

      try {
        const validTask = await app.objection.models.task.fromJson(taskData);

        await app.objection.models.task.transaction(async (trx) => {
          const newTask = {
            ...validTask,
            labels: labelsIds,
          };

          await app.objection.models.task.query(trx).insertGraph(newTask, { relate: ['labels'] });
        });
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect('/tasks');
      } catch ({ data }) {
        const [statuses, users, labels] = await Promise.all([
          app.objection.models.status.query(),
          app.objection.models.user.query(),
          app.objection.models.label.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task, statuses, users, labels, errors: data ?? {},
        });
      }

      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      const labels = await app.objection.models.label.query();
      const selectedLabels = await task.$relatedQuery('labels').select('labels.id');
      const selectedLabelsIds = selectedLabels.map((label) => label.id);

      reply.render('tasks/edit', {
        task, statuses, users, labels, selectedLabelsIds,
      });

      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const { models } = app.objection;
      const taskId = Number(req.params.id);
      const selectedTask = await models.task.query().findById(taskId);
      const formData = new models.task().$set(req.body.data);
      const existingLabels = [req.body.data.labels].flat()
        .map((labelId) => ({ id: Number(labelId) }));
      const taskData = {
        ...formData,
        name: formData.name.trim(),
        creatorId: Number(selectedTask.creatorId),
        statusId: Number(formData.statusId),
        executorId: Number(formData.executorId),
      };
      const statuses = await models.status.query();
      const users = await models.user.query();
      const labels = await models.label.query();
      const selectedLabels = await models.task.relatedQuery('labels').for(selectedTask);
      const selectedLabelsIds = selectedLabels.map((label) => label?.id);

      try {
        const validTaskData = await models.task.fromJson(taskData);
        await models.task.transaction(async (trx) => {
          const updatedTask = await models.task.query(trx)
            .upsertGraph({ id: taskId, ...validTaskData, labels: existingLabels }, {
              relate: true, unrelate: true,
            });
          return updatedTask;
        });
        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        console.log(error.data);
        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/edit', {
          task: { ...selectedTask, ...formData },
          statuses,
          users,
          labels,
          selectedLabelsIds,
          errors: error.data,
        });
      }
      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { id: currentUserId } = req.user;
      const currentTask = await app.objection.models.task.query().findById(id);

      if (currentUserId !== currentTask.creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.wrongUser'));
        return reply.redirect(app.reverse('tasks'));
      }

      try {
        await app.objection.models.task.transaction(async (trx) => {
          await currentTask.$relatedQuery('labels', trx).unrelate();
          await app.objection.models.task.query(trx).deleteById(id);
        });
        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }

      return reply;
    });
};
