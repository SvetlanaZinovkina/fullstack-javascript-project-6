// @ts-check

import { URL } from 'url';
import fs from 'fs';
import path from 'path';

// TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

const getFixturePath = (filename) => path.join('..', '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(new URL(getFixturePath(filename), import.meta.url), 'utf-8').trim();
const getFixtureData = (filename) => JSON.parse(readFixture(filename));

export const getTestData = () => getFixtureData('testData.json');

export const prepareData = async (app) => {
  const { knex } = app.objection;

  const users = getFixtureData('users.json');
  const statuses = getFixtureData('statuses.json');
  const tasks = getFixtureData('tasks.json');
  const labels = getFixtureData('labels.json');
  const tasksLabels = getFixtureData('tasksLabels.json');

  await knex.transaction(async (trx) => {
    await trx('users').insert(users);
    await trx('statuses').insert(statuses);
    await trx('tasks').insert(tasks);
    await trx('labels').insert(labels);
    await trx('tasksLabels').insert(tasksLabels);
  });
};
