/* eslint-disable class-methods-use-this */
import service from '../services/companies';

export default class CompanyController {
  async get(req, res, next) {
    try {
      const response = await service.listCompanies(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async post(req, res, next) {
    try {
      const response = await service.postCompany(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const response = await service.getCompany(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res) {
    throw new Error('Not implemented');
  }
}
