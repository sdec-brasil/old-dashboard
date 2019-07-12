/* eslint-disable class-methods-use-this */

import { validationResult } from 'express-validator/check';
import service from '../services/users';

export default class UsersController {
  async getMe(req, res, next) {
    try {
      const response = await service.getUserInfo(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async post(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      try {
        const response = await service.createNewUser(req);
        res.status(response.code).send(response.data);
      } catch (err) {
        next(err);
      }
    }
  }


  async updateUser(req, res, next) {
    try {
      const response = await service.updateUser(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }
}
