/* eslint-disable class-methods-use-this */
import { validationResult } from 'express-validator/check';
import service from '../services/clients';

export default class ClientsController {
  async getMe(req, res, next) {
    try {
      const response = service.getClientInfo(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async post(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const response = await service.createNewClient(req);
        res.status(response.code).send(response.data);
      } catch (err) {
        next(err);
      }
    } else {
      res.status(422).json({ errors: errors.array() });
    }
  }

  async patch(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const response = await service.updateClient(req);
        res.status(response.code).send(response.data);
      } catch (err) {
        next(err);
      }
    } else {
      res.status(422).json({ errors: errors.array() });
    }
  }

  async delete(req, res, next) {
    try {
      const response = await service.deleteClient(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }
}
