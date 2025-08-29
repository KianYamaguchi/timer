import { app } from './app';
import request from 'supertest';
describe('GET /', () => {
  test('redirects to /home', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/home');
  });
});
describe('GET /home', () => {
  test('renders Hello World! in home.ejs', async () => {
    const response = await request(app).get('/home');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<h1>ストップウォッチ</h1>');
  });
});