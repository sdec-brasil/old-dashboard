/* eslint-disable class-methods-use-this */
import { InvoiceGet } from '../services/invoices';

export default class InvoiceController {
  async get(req, res) {
    const response = await InvoiceGet(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res) {
    throw new Error('Not implemented');
  }

  async getByTxId(req, res) {
    // req.params.txid
    throw new Error('Not implemented');
  }

  async replaceInvoice(req, res) {
    throw new Error('Not implemented');
  }
}
