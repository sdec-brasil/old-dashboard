/* eslint-disable class-methods-use-this */
import { InvoiceGet } from '../services/invoices';

export default class InvoiceController {
  async get(req, res) {
    const response = await InvoiceGet(req);
    res.status(response.code).send(response.data);
  }
}
