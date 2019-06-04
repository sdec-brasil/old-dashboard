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
    done();
  });
});


describe('/v1/invoices - Clean Database', () => {
  test('GET /invoices', async (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(0);
        done();
      });
  });
});
