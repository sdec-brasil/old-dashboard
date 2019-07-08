/* eslint-disable class-methods-use-this */
import service from '../services/settlement';

export default class SettlementController {
  async get(req, res) {
    const response = await service.listSettlements(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res) {
    throw new Error('Not implemented');
  }

  async getSettlementsToCity(req, res) {
    const response = await service.getSettlementsToCity(req);
    res.status(response.code).send(response.data);
  }

  async getSettlementsFromCompany(req, res) {
    const response = await service.getSettlementsFromCompany(req);
    res.status(response.code).send(response.data);
  }
}
