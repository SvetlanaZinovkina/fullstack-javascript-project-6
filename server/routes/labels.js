import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels', preValidation: app.authenticate }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabels', preValidation: app.authenticate }, (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });

      return reply;
    })
    .get('/labels/:id/edit', { name: 'currentLabel' }, async (req, reply) => {
      const label = await app.objection.models.label.query().findById(req.params.id);

      reply.render('/labels/update', { label });
      return reply;
    })
    .post('/labels', { name: 'newLabel', preValidation: app.authenticate }, async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect('/labels');
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label, errors: data.name });
      }

      return reply;
    })
    .patch('/labels/:id', { name: 'updateLabel', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { data } = req.body;
      const label = await app.objection.models.label.query().findById(id);

      try {
        const validLabel = await app.objection.models.label.fromJson(data);
        await label.$query().patch(validLabel);

        req.flash('info', i18next.t('flash.labels.update.success'));
        reply.redirect(app.reverse('labels'));
      } catch (errors) {
        req.flash('error', i18next.t('flash.labels.update.error'));
        label.$set(data);
        reply.render('labels/edit', { label, errors: errors.data ?? {} });
      }

      return reply;
    })
    .delete('/labels/:id', { name: 'deleteLabel', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const label = await app.objection.models.label.query().findById(id);
      const labelTasks = await label.$relatedQuery('tasks');

      if (labelTasks.length) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
        return reply.redirect(app.reverse('labels'));
      }

      try {
        await app.objection.models.label.query().deleteById(id);
        req.flash('info', i18next.t('flash.labels.delete.success'));
      } catch (error) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
      }
      reply.redirect(app.reverse('labels'));

      return reply;
    });
};
