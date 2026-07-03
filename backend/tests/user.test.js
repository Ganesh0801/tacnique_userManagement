import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server.js';
import User from '../models/User.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const sampleUser = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  department: 'Engineering',
};

describe('User API', () => {
  test('POST /api/users creates a user', async () => {
    const res = await request(app).post('/api/users').send(sampleUser);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(sampleUser.email);
  });

  test('POST /api/users rejects an invalid email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ ...sampleUser, email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/users rejects a duplicate email', async () => {
    await request(app).post('/api/users').send(sampleUser);
    const res = await request(app).post('/api/users').send(sampleUser);
    expect(res.status).toBe(409);
  });

  test('GET /api/users returns paginated results', async () => {
    await User.create(sampleUser);
    await User.create({ ...sampleUser, email: 'grace@example.com', firstName: 'Grace' });

    const res = await request(app).get('/api/users?page=1&limit=1');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.pagination.totalCount).toBe(2);
    expect(res.body.pagination.totalPages).toBe(2);
  });

  test('GET /api/users?search filters across fields', async () => {
    await User.create(sampleUser);
    await User.create({ ...sampleUser, email: 'bob@example.com', firstName: 'Bob', lastName: 'Smith' });

    const res = await request(app).get('/api/users?search=Lovelace');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].lastName).toBe('Lovelace');
  });

  test('PUT /api/users/:id updates a user', async () => {
    const created = await User.create(sampleUser);
    const res = await request(app)
      .put(`/api/users/${created._id}`)
      .send({ ...sampleUser, department: 'Product' });

    expect(res.status).toBe(200);
    expect(res.body.data.department).toBe('Product');
  });

  test('PUT /api/users/:id returns 404 for a non-existent user', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).put(`/api/users/${fakeId}`).send(sampleUser);
    expect(res.status).toBe(404);
  });

  test('DELETE /api/users/:id removes a user', async () => {
    const created = await User.create(sampleUser);
    const res = await request(app).delete(`/api/users/${created._id}`);
    expect(res.status).toBe(200);

    const stillThere = await User.findById(created._id);
    expect(stillThere).toBeNull();
  });

  test('GET /api/users/:id with a malformed id returns 400', async () => {
    const res = await request(app).get('/api/users/not-a-valid-id');
    expect(res.status).toBe(400);
  });
});
