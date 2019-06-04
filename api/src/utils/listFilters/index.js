import models from '../../models';
import { limitSettings } from '../../config/config';

const { Op } = models.Sequelize;

export default class ListView {
  constructor() {
    this.filterFields = [];
    this.model = null;
    this.filters = {};
  }

  setFilterFields(filterFields) {
    if (Array.isArray(filterFields)) {
      this.filterFields = filterFields;
    }
  }

  getFilters() {
    return this.filters;
  }

  setModel(model) {
    this.model = model;
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
    if (modelField.type.key === 'STRING') {
      return filterValue;
    }
    throw new Error(`Field type ${modelField.type.key} not recognized.`);
  }


  static addWhere(obj, model, queryField, filterValue) {
    let [field, op] = queryField.split('_');
    if (op === 'from') {
      op = Op.gte;
    } else if (op === 'to') {
      op = Op.lte;
    } else {
      op = Op.eq;
    }
    const modelField = model.rawAttributes[field];
    if (modelField !== undefined) {
      console.log(typeof (modelField.type.key));
      console.log(`field: ${field} - ${modelField.type.key}`);
      console.log(`${modelField.type}:`, Object.keys(modelField.type));
      Object.keys(modelField.type).forEach((key) => {
        console.log(`${key}:`, modelField.type[key]);
      });

      // checking field type, to parse query string correctly:
      const parsedFilterValue = this.parseValue(filterValue, modelField);

      if (!obj.where) {
        obj.where = {};
      }
      if (!obj.where[field]) {
        obj.where[field] = {};
      }
      obj.where[field][op] = parsedFilterValue;
    }
  }


  buildQuery(req) {
    if (this.model) {
      Object.keys(req.query).forEach((queryField) => {
        if (this.filterFields.includes(queryField)) {
          // checks for association fields
          const [field, targetField] = queryField.split('__');
          if (targetField) {
            // const modelField = this.model.associations[field];
            // const modelTargetField = this.model.associations[field]
            //   .target.rawAttributes[targetField];
            // console.log('modelField:', Object.keys(modelField));
            // console.log('modelTargetField:', Object.keys(modelTargetField));
            // console.log('modelTargetField - field:', modelTargetField.field);
            // console.log('modelTargetField -  - fieldName:', modelTargetField.fieldName);

            // build include property
            if (!this.filters.include) {
              this.filters.include = [];
            }
            // check to see if there is already an include for this association
            let includeObject;
            this.filters.include.forEach((element) => {
              if (element.as === field) {
                includeObject = element;
              }
            });
            // if there is not include for this, build one
            if (!includeObject) {
              includeObject = {
                model: this.model.associations[field].target,
                as: field,
              };
              this.filters.include.push(includeObject);
            }
            // parse the where clause normally relative to this include.
            const targetModel = this.model.associations[field].target;
            this.constructor
              .addWhere(includeObject, targetModel, targetField, req.query[queryField]);
          } else {
            // faz normal
            this.constructor
              .addWhere(this.filters, this.model, queryField, req.query[queryField]);
          }
        }
      });
      // adding offset
      if (req.query.offset) {
        this.filters.offset = parseInt(req.query.offset, 10);
      }
      // adding limit
      if (req.query.limit) {
        this.filters.limit = parseInt(req.query.limit, 10);
      }
      console.log('query object built:', this.filters);
      return;
    }
    throw new Error('model property not set');
  }


  executeQuery() {
    return this.model.findAll(this.filters);
  }
}
