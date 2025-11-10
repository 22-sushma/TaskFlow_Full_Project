import request from 'supertest';
import app from '../src/app.js';

describe('Projects API', () => {
  it('GET /api/v1/projects should return 200', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success');
  });
});
