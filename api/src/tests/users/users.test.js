/* eslint-disable func-names */
// Imports
import request from 'supertest';
import fixtures from 'sequelize-fixtures';
import models from '../../models';

// App Imports
import server from '../../index';

process.env.NODE_ENV = 'test';

beforeAll((done) => {
  jest.setTimeout(7000);
  process.on('dataLoaded', () => {
    fixtures.loadFile(`${__dirname}/data.js`, models)
      .then(() => done())
      .catch((e) => {
        throw new Error(e);
      });
  });
});


describe('GET /users', () => {
  test('should return code 200', async (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
