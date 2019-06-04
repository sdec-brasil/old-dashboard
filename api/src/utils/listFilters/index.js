import models from '../../models';
import { limitSettings } from '../../config/config';

const { Op } = models.Sequelize;

export default class ListView {
  constructor() {
    this.filterFields = [];
    this.model = null;
  }

  setFilters(filterFields) {
    if (Array.isArray(filterFields)) {
      this.filterFields = filterFields;
    }
  }

  setModel(model) {
    this.model = model;
  }

  query(req) {
    if (this.model) {
      const filters = {};
      filters.where = {};

      Object.keys(req.query).forEach((queryField) => {
        // split field from operator
        if (this.model.associations[queryField]) {
          console.log('association: ', this.model.associations[queryField]);
        }
        console.log('assc:', Object.keys(this.model.associations.estado1));
        Object.keys(this.model.associations.estado1).forEach((key) => {
          console.log(key, this.model.associations.estado1[key]);
        });
        let modelField;
        // check related field ---------------------------
        const [relation, target] = queryField.split('__');
        // check model field -----------------------------
        // checking from and to operators
        let [field, op] = queryField.split('_');
        if (op === 'from') {
          op = Op.gte;
        } else if (op === 'to') {
          op = Op.lte;
        }
        modelField = this.model.rawAttributes[field];

        if ((modelField !== undefined)
        && this.filterFields.includes(field)) {
          console.log(typeof (modelField.type.key));
          console.log(`field: ${field} - ${modelField.type.key}`);
          console.log(`${modelField.type}:`, Object.keys(modelField.type));
          Object.keys(modelField.type).forEach((key) => {
            console.log(`${key}:`, modelField.type[key]);
          });

          // checking field type, to parse query string correctly:
          const filterValue = this.parseValue(req.query[queryField], modelField);

          // adding field to the filter object
          if (op) {
            if (filters.where[field] === undefined) {
              filters.where[field] = {};
            }
            filters.where[field][op] = filterValue;
          } else {
            filters.where[field] = filterValue;
          }
        }
      });
      // adding offset
      if (req.query.offset) {
        filters.offset = parseInt(req.query.offset, 10);
      }
      // adding limit
      if (req.query.limit) {
        filters.limit = parseInt(req.query.limit, 10);
      }
      console.log('query object:', filters);

      // console.log(this.model.rawAttributes);
      return this.model.findAll(filters);
    }
    return null;
  }


  static parseValue(filterValue, modelField) {
    if (modelField.type.key === 'BOOLEAN') {
      return (filterValue === 'true');
    }
    if (modelField.type.key === 'INTEGER') {
      return parseInt(filterValue, 10);
    }
    if (modelField.type.key === 'DATE') {
      return Date.parse(filterValue);
    }
    throw new Error(`Field type ${modelField.type.key} not recognized.`);
  }
}
