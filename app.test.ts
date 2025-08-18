import { app } from './app';
import request from 'supertest';

describe('GET /', () => {
    test('returns Hello World!', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});
describe('GET /home', () => {
  test('renders Hello World! in home.ejs', async () => {
    const response = await request(app).get('/home');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<h1>Hello World!</h1>');
  });
});