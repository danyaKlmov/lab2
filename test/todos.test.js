const testEnv = require('./.env.test.json');
process.env = { ...process.env, ...testEnv };
const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('../app');

describe('Test todos API', () => {
  const addedIds = [];
  test('It should add TODO', async () => {
    const newTodo = {
      title: faker.random.words(4),
      description: faker.lorem.lines(2)
    };
    const response = await request(app).post('/todos').send(newTodo);
    expect(response.status).toEqual(201);
    expect(response.body._id).toBeTruthy();
    addedIds.push(response.body._id);
  }, 10000);
  test('It should add one more TODO', async () => {
    const newTodo = {
      title: faker.random.words(4),
      description: faker.lorem.lines(2)
    };
    const response = await request(app).post('/todos').send(newTodo);
    expect(response.status).toEqual(201);
    expect(response.body._id).toBeTruthy();
    addedIds.push(response.body._id);
  }, 10000);
  test('It should get all TODOs', async () => {
    const response = await request(app).get('/todos');
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
  }, 10000);
  test('It should get one TODO by id', async () => {
    const response = await request(app).get(`/todos/${addedIds[0]}`);
    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(addedIds[0]);
  }, 10000);
  test('It should delete one TODO by id', async () => {
    const response = await request(app).delete(`/todos/${addedIds[0]}`);
    expect(response.status).toEqual(200);
  }, 10000);
  test('It should check that only one todo left', async () => {
    const response = await request(app).get('/todos');
    expect(response.body.length).toEqual(1);
    expect(response.status).toEqual(200);
  }, 10000);
  test('It should delete all the todos left', async () => {
    const response = await request(app).delete('/todos');
    expect(response.status).toEqual(200);
  }, 10000);
  test('It should check that no todos left after deletion', async () => {
    const response = await request(app).get('/todos');
    expect(response.body.length).toEqual(0);
    expect(response.status).toEqual(200);
  }, 10000);
});
