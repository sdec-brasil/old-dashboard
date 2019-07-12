/* eslint-disable class-methods-use-this */

import service from '../services/cities';


export default class CitiesController {
  async get(req, res, next) {
    try {
      const response = await service.listCities(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const response = await service.getCity(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }
}
