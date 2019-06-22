/* eslint-disable class-methods-use-this */

import service from '../services/users';

const ev = require('express-validator');

export default class UsersController {
  async getMe(req, res) {
    const response = await service.getUserInfo(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res) {
    const response = await service.createNewUser(req);
    res.status(response.code).send(response.data);
  }


  async updateUser(req, res) {
    const response = await service.updateUser(req);
    res.status(response.code).send(response.data);
  }
}
