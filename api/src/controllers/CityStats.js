/* eslint-disable class-methods-use-this */

import service from '../services/cityStats';


export default class CityStatsController {
  async get(req, res, next) {
    try {
      const response = await service.getCityStats(req);
      res.status(response.code).send(response.data);
    } catch (err) {
      next(err);
    }
  }
}
