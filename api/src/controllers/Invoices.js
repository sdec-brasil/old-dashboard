/* eslint-disable class-methods-use-this */
import { validationResult, check, param } from 'express-validator/check';
import service from '../services/invoices';


export default class InvoiceController {
  async get(req, res, next) {
    try {
      const response = await service.listInvoices(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async post(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const response = await service.postInvoice(req);
        res.status(response.code).send(response.data);
      } catch (err) {
        next(err);
      }
    } else {
      res.status(422).json({ errors: errors.array() });
    }
  }

  async getByTxId(req, res, next) {
    try {
      const response = await service.getInvoice(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async replaceInvoice(req, res, next) {
  // check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const response = await service.replaceInvoice(req);
        res.status(response.code).send(response.data);
      } catch (err) {
        next(err);
      }
    } else {
      res.status(422).json({ errors: errors.array() });
    }
  }
}
