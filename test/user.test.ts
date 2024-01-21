import request from 'supertest';
import { app, server } from '../src/app'
import { User } from '../src/api/user/user.model';
import { fakeUserData } from './fixtures/index';
import {
  validateNotEmpty,
  validateStringEquality,
} from './utils/validators';

describe('User Model Test Suite', () => {
  test('should validate saving a new user successfully', async () => {
    const validUser = new User(fakeUserData);
    const savedUser = await validUser.save();

    validateNotEmpty(savedUser);

    validateStringEquality(savedUser.category, fakeUserData.category);
    validateStringEquality(
      savedUser.firstName,
      fakeUserData.firstName
    );
    validateStringEquality(
      savedUser.lastName,
      fakeUserData.lastName
    );
  });
});

describe('User Endpoints Test Suite', () => {
  afterAll(() => { 
    if (server) {
      server.close();
    }
  });

  let userId = '';
  it('should create a new User', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(fakeUserData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toEqual(true);
    userId = res.body.data._id;
  });

  it('should get User from DB', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.data._id).toEqual(userId);
  });

  // we can add more unit tests for params validation and failed cases
});
