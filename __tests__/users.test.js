// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  let cookie;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
    await prepareData(app);
  });

  beforeEach(async () => {
    await prepareData(app);
  });

  it('register', async () => {
    const responsePost = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: testData.users.existing,
      },
    });

    expect(responsePost.statusCode).toBe(200);

    const [sessionCookie] = responsePost.cookies;
    const { name, value } = sessionCookie;
    cookie = { [name]: value };

    const responseDelete = await app.inject({
      method: 'DELETE',
      url: '/users/1',
      cookies: cookie,
    });

    expect(responseDelete.statusCode).toBe(302);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });
    expect(user).toMatchObject(expected);
  });

  it('update', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/users/1',
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
  });

  it('edit', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/users/2/edit',
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
  });

  it('delete', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/users/2',
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
  });
  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции
    // await knex.migrate.rollback();
    await knex('users').truncate();
  });

  afterAll(async () => {
    await app.close();
  });
});
