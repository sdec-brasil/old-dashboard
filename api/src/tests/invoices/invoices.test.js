/* eslint-disable func-names */
// Imports
import request from 'supertest';
import fixtures from 'sequelize-fixtures';
import models from '../../models';

// App Imports
import server from '../../index';

process.env.NODE_ENV = 'test';

function closeTimeStamps(timestamp1, timestamp2) {
  // Tolerate 5 seconds difference between the timestamps
  if (new Date(timestamp2).getTime() - timestamp1 < 5000) {
    return true;
  }
  return false;
}

beforeAll((done) => {
  jest.setTimeout(7000);
  process.on('dataLoaded', () => {
    done();
  });
});


describe('/v1/invoices - Clean Database', () => {
  test('GET /invoices [empty]', async (done) => {
    const timeRequest = new Date().getTime();
    request(server)
      .get('/v1/invoices')
      .end((err, res) => {
        expect(res.status).toBe(200);

        expect(res.body).toHaveProperty('cursor');
        expect(res.body).toHaveProperty('data');
        expect(res.body).not.toHaveProperty('error');

        expect(res.body.cursor).toHaveProperty('until');
        expect(closeTimeStamps(timeRequest, res.body.cursor.until)).toBeTruthy();
        expect(res.body.cursor).toHaveProperty('offset');
        expect(res.body.cursor).toHaveProperty('limit');

        expect(res.body.cursor.limit).toBeGreaterThan(0);
        expect(res.body.cursor.offset).toBeGreaterThan(0);

        expect(res.body.cursor).toHaveProperty('next', null);
        expect(res.body.cursor).toHaveProperty('before', null);

        expect(res.body.data).toHaveLength(0);

        done();
      });
  });
});
