import request from 'supertest';
import app from '../src/app.js';
describe('Tasks API', () => {
  it('GET /api/v1/tasks should return 200', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toBe(200);
  });
});
