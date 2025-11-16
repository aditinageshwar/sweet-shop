const request = require('supertest');
const {app, connectDB} = require('../src/app');
const Sweet = require('../src/models/Sweet');
const User = require('../src/models/User');

let token = "";
let sweetId;

beforeAll(async () => {
  await connectDB();
  await Sweet.deleteMany();
  await User.deleteMany();

  await request(app).post('/api/auth/register').send({ username: 'Aditi1', email: 'itsaditi48@gmail.com', password: '1111'});

  const res = await request(app).post('/api/auth/login').send({email: "itsaditi48@gmail.com", password: '1111' });
  token = res.body.token;

  const sweet = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 10
    });

  sweetId = sweet.body._id;
 });

describe('Sweet API', () => {
  test('should get all sweets', async () => {
    const res = await request(app).get('/api/sweets').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should purchase a sweet', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.sweet.quantity).toBe(9);
  });

  test('should restock a sweet (admin)', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 5 });
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(14);
  });

  test('should reject purchase if out of stock', async () => {
    // Reduce quantity to 0
    await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 0 });
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Out of stock');
  });

  test('should add a new sweet (admin)', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Chocolate', category: 'Candy', price: 5, quantity: 10 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Chocolate');
  });

  test('should update a sweet (admin)', async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 20 });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(20);
  });

  test('should delete a sweet (admin)', async () => {
    const addRes = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Chocolate', category: 'Candy', price: 5, quantity: 10 });
    const res = await request(app)
      .delete(`/api/sweets/${addRes.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Sweet deleted");
  });

  test('should search sweets by name', async () => {
    const res = await request(app)
      .get('/api/sweets/search?name=Chocolate')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toBe('Chocolate');
  });
});

