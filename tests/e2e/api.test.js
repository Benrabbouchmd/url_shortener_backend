const request = require('supertest');
const app = require('../../src/app');

describe('API Endpoints', () => {
  test('should create short url', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ url: 'https://example.com/test' });

    expect(response.status).toBe(200);
    expect(response.body.short_url).toHaveLength(7);
  });

  test('should handle invalid url', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ url: 'invalid-url' });

    expect(response.status).toBe(400);
  });

  test('should redirect to long url', async () => {
    const response = await request(app).get('/1L9zO9O');

    expect(response.status).toBe(302);
  });

  test('should handle invalid short url', async () => {
    const response = await request(app).get('/zzzzzzz');

    expect(response.status).toBe(404);
  });
});