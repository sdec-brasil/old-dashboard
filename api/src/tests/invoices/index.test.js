/* eslint-disable func-names */
// Imports
import chai from 'chai';
import request from 'supertest';

// App Imports
import server from '../../index';

process.env.NODE_ENV = 'test';

const { expect } = chai;

export default function suite() {
  describe('GET /invoices', () => {
    it('should return code 200', (done) => {
      request(server)
        .get('/')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
}
