/* eslint-disable class-methods-use-this */

import models from '../models';
import { limitSettings } from '../config/config';
import { treatNestedFilters } from '../utils';
import ResponseList from '../utils/response';


const sqs = require('sequelize-querystring');

export default class CitiesController {
  async get(req, res) {
    const sq = sqs.withSymbolicOps(models.Sequelize, { symbolic: true });
    const where = req.query.filter ? sq.find(req.query.filter) : {};
    treatNestedFilters(req.query, where);
    models.prefeitura.findAndCountAll({
      offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || limitSettings.city.get,
      where,
      order: req.query.sort ? sq.sort(req.query.sort) : [],
      include: [
        {
          model: models.municipio,
          include: [
            models.estado, models.regiao,
          ],
        },
      ],
    }).then((results) => {
      const response = new ResponseList(req, results);
      res.status(200).json(response.value());
    }).catch((err) => {
      res.status(500).json({ error: err.message });
      throw err;
    });
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
