const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API Suite test', () => {
    let app;

    before((done) => {
        app = require('./api');
        app.once('listening', done);
    });

    after((done) => {
        app.close(done);
    });

    describe('/contact:get', () => {
        it('should return 200 and "Contact page"', async () => {
            const response = await supertest(app).get('/contact').expect(200);

            assert.strictEqual(response.text, 'Contact page');
        });
    });

    describe('/login:post', () => {
        it('should return 401 and "Invalid credentials" when userName or password is invalid', async () => {
            const response = await supertest(app).post('/login')
                .expect(401)
                .send({
                    userName: 'admin',
                    password: 'admn'
                })
                .expect('Invalid credentials');


            assert.strictEqual(response.text, 'Invalid credentials');
        });

        it('should return 200 and "Login successful" when userName and password are valid', async () => {
            const response = await supertest(app).post('/login')
                .expect(200)
                .send({
                    userName: 'admin',
                    password: 'admin'
                })
                .expect('Login successful');


            assert.strictEqual(response.text, 'Login successful');
        });

        it('should request and existing page and return HTTP status 404', async () => {
            const response = await supertest(app).post('/loin')
                .expect(404)
                .expect('Page not found');


            assert.strictEqual(response.text, 'Page not found');
        });
    });
});