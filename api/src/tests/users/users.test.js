/* eslint-disable func-names */
// Imports
import chai from 'chai';
import request from 'supertest';

// App Imports
import server from '../../index';

process.env.NODE_ENV = 'test';

const { expect } = chai;

beforeAll((done) => {
  jest.setTimeout(7000);
  process.on('dataLoaded', done);
});


describe('GET /invoices', () => {
  test('should return code 200', async (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
