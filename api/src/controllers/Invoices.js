/* eslint-disable class-methods-use-this */
import { InvoiceGet } from '../services/invoices';
import models from '../models';
import { serializers } from '../utils';

export default class InvoiceController {
  async get(req, res) {
    const response = await InvoiceGet(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res) {
    throw new Error('Not implemented');
  }

  async getByTxId(req, res) {
    const inv = await models.invoice.findByPk(req.params.txid);
    if (inv) {
      res.json(serializers.invoice(inv));
    } else {
      res.status(404).send('Not found');
    }
    // throw new Error('Not implemented');
  }

  async replaceInvoice(req, res) {
    throw new Error('Not implemented');
  }
}
