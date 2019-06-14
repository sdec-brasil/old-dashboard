/* eslint-disable class-methods-use-this */
import service from '../services/invoices';

export default class InvoiceController {
  async get(req, res) {
    const response = await service.listInvoices(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res) {
    throw new Error('Not implemented');
  }

  async getByTxId(req, res) {
    const response = await service.getInvoice(req);
    res.status(response.code).send(response.data);
  }

  async replaceInvoice(req, res) {
    throw new Error('Not implemented');
  }
}
