/* eslint-disable class-methods-use-this */
import service from '../services/user';

export default class UserControllers {
  async get(req, res) {
    const response = await service.getUserInfo(req);
    res.status(response.code).send(response.data);
  }

  async patch(req, res) {
    const response = await service.patchUserInfo(req);
    res.status(response.code).send(response.data);
  }
}
