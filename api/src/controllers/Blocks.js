/* eslint-disable class-methods-use-this */
import service from '../services/blocks';

export default class BlocksController {
  async get(req, res) {
    const response = await service.listBlocks(req);
    res.status(response.code).send(response.data);
  }

  async getById(req, res) {
    const response = await service.getBlock(req);
    res.status(response.code).send(response.data);
  }
}
