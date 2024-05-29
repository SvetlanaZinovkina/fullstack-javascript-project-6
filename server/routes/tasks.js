import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const tasks = await app.objection.models.task.query();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/index', { tasks, statuses, users });
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
    .post('/tasks', async (req, reply) => {
      const { id: creatorId } = req.user;
      const task = new app.objection.models.task();
      const {
        name, description, statusId, executorId, labels: labelsList = [],
      } = req.body.data;

      const taskData = {
        name,
        description,
        statusId: Number(statusId),
        executorId: Number(executorId),
        creatorId: Number(creatorId),
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
    });
};
