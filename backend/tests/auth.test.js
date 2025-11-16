const request = require('supertest');
const {app, connectDB} = require('../src/app');
const User = require('../src/models/User');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany();  

  await request(app)
    .post('/api/auth/register')
    .send({ username: 'aditi', email: 'aditinageshwar@gmail.com', password: '1234' });
});

describe('Auth API', () => { 
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'anmol', email:"anmolgupta@gmail.com", password: '4321' });
    expect(res.status).toBe(201);
    expect(res.body.user.username).toBe('anmol');
  });

  test('should login a user and return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'aditinageshwar@gmail.com', password: '1234' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('should reject invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@test.com', password: 'wrong' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('User not found');
  });
});
