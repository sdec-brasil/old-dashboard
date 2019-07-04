/* eslint-disable class-methods-use-this */
import { validationResult, check, param } from 'express-validator/check';
import service from '../services/invoices';


export default class InvoiceController {
  async get(req, res) {
    const response = await service.listInvoices(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const response = await service.postInvoice(req);
      if (response.code !== 201) {
        next(response.data);
      } else {
        res.status(response.code).send(response.data);
      }
    }
  }

  async getByTxId(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }
    const response = await service.getInvoice(req);
    res.status(response.code).send(response.data);
  }

  async replaceInvoice(req, res, next) {
    const response = await service.replaceInvoice(req);
    if (response.code !== 201) {
      next(response.data);
    } else {
      res.status(response.code).send(response.data);
    }
  }
}
