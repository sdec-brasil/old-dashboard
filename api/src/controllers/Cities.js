/* eslint-disable class-methods-use-this */

import models from '../models';
import { limitSettings } from '../config/config';


const sqs = require('sequelize-querystring');

export default class CitiesController {
  async get(req, res) {
    const sq = sqs.withSymbolicOps(models.Sequelize, { symbolic: true });
    models.prefeitura.findAndCountAll({
      offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || limitSettings.city.get,
      where: req.query.filter ? sq.find(req.query.filter) : {},
      order: req.query.sort ? sq.sort(req.query.sort) : [],
    }).then((results) => {
      res.json(results);
    }).catch((err) => {
      res.json(err.message);
    });
    // throw new Error('Not implemented');
  }

  async getById(req, res) {
    const inv = await models.prefeitura.findByPk(req.params.id);
    if (inv) {
      res.json(inv);
    } else {
      res.status(404).send('Not found');
    }
  }
}
