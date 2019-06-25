/* eslint-disable class-methods-use-this */
import service from '../services/companies';

export default class CompanyController {
  async get(req, res) {
    const response = await service.listCompanies(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res) {
    throw new Error('Not implemented');
  }

  async getById(req, res) {
    const response = await service.getCompany(req);
    res.status(response.code).send(response.data);
  }

  async update(req, res) {
    throw new Error('Not implemented');
  }
}
