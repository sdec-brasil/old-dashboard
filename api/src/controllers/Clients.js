/* eslint-disable class-methods-use-this */
import service from '../services/clients';

export default class ClientsController {
  async getMe(req, res) {
    const response = await service.getClientInfo(req);
    res.status(response.code).send(response.data);
  }

  async post(req, res) {
    const response = await service.createNewClient(req);
    res.status(response.code).send(response.data);
  }

  async patch(req, res) {
    const response = await service.updateClient(req);
    res.status(response.code).send(response.data);
  }

  async delete(req, res) {
    const response = await service.deleteClient(req);
    res.status(response.code).send(response.data);
  }
}
