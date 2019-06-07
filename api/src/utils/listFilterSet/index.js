import models from '../../models';

const { Op } = models.Sequelize;

export default class ListFilterSet {
  constructor() {
    this.filterFields = [];
    this.model = null;
    this.filters = {};
  }


  /**
   * @function setFilterFields
   *
   * @description used to set filterable fields on one ListFilterSet instance.
   * query parameters not in filterFields will be completely ignored.
   *
   * @param {Array<String>} filterFields - array of strings with the allowed query parameters.
   * @memberof ListView
   */
  setFilterFields(filterFields) {
    if (Array.isArray(filterFields)) {
      this.filterFields = filterFields;
    } else {
      throw new Error('!! Error !! ListView.setFilterFields argument should be an array!');
    }
  }


  /**
   * @function setModel
   *
   * @description sets the main model to be used in the query.
   * the model should be set before making any buildQuery() calls.
   *
   * @param {Sequelize.Model} model - the Sequelize model instance of the table
   * where the query is going to be made on.
   * @memberof ListView
   */
  setModel(model) {
    this.model = model;
  }


  /**
   * @function getFilters
   *
   * @description a getter for the filters that are going to be passed
   * to sequelize findAll().
   * This way you can modify the filters between building
   * and executing the query.
   *
   * @returns filters object that is going to be passed to sequelize findAll().
   * @memberof ListView
   */
  getFilters() {
    return this.filters;
  }


  /**
   * @function parseValue
   *
   * @description Parses a given string according to the modelField type.
   *
   * @static
   * @param {String} value - the string to be parsed
   * @param {Sequelize.Model.Field} modelField - the sequelize table field instance
   * that will be used to find out the field type
   * @returns {any} value parameter, parsed accordingly to its field type
   * @memberof ListView
   */
  static parseValue(value, modelField) {
    if (modelField.type.key === 'BOOLEAN') {
      return (value === 'true');
    }
    if (['INTEGER', 'TINYINT', 'BIGINT'].includes(modelField.type.key)) {
      return parseInt(value, 10);
    }
    if (modelField.type.key === 'DATE') {
      return Date.parse(value);
    }
    if (['STRING', 'VARCHAR', 'TEXT', 'TINYTEXT'].includes(modelField.type.key)) {
      return value;
    }
    throw new Error(`Field type ${modelField.type.key} not recognized.`);
  }


  static addWhere(obj, model, queryField, filterValue) {
    // adds a where clause inside an object, following the
    // sequelize query structure
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
      // console.log(typeof (modelField.type.key));
      // console.log(`field: ${field} - ${modelField.type.key}`);
      // console.log(`${modelField.type}:`, Object.keys(modelField.type));
      // Object.keys(modelField.type).forEach((key) => {
      //   console.log(`${key}:`, modelField.type[key]);
      // });

      const parsedFilterValue = this.parseValue(filterValue, modelField);
      if (obj.where === undefined) {
        obj.where = {};
      }
      if (obj.where[field] === undefined) {
        obj.where[field] = {};
      }
      obj.where[field][op] = parsedFilterValue;
    }
  }


  /**
   * @function buildQuery
   *
   * @description Builds the query object that is going to be passed to sequelize
   * findAll(), and saves it in this.filters.
   *
   * @param {Express.Request} req - the received request in the endpoint
   * @memberof ListView
   */
  buildQuery(req) {
    if (req === undefined) {
      throw new Error('!! Error !! ListView.buildQuery(req) requires the request as argument.');
    }
    if (!this.model) {
      throw new Error('!! Error !! ListView.buildQuery(req) called but model was not set yet! Set it with ListView.setModel(model).');
    }
    Object.keys(req.query).forEach((queryField) => {
      if (this.filterFields.includes(queryField)) {
        // checks for association fields
        const [field, targetField] = queryField.split('__');
        if (targetField) {
          /*
            const modelField = this.model.associations[field];
            const modelTargetField = this.model.associations[field]
              .target.rawAttributes[targetField];
            console.log('modelField:', Object.keys(modelField));
            console.log('modelTargetField:', Object.keys(modelTargetField));
            console.log('modelTargetField - field:', modelTargetField.field);
            console.log('modelTargetField -  - fieldName:', modelTargetField.fieldName);
            */

          // build include property
          if (this.filters.include === undefined) {
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
          if (includeObject === undefined) {
            includeObject = {
              model: this.model.associations[field].target,
              as: field,
              attributes: [],
            };
            this.filters.include.push(includeObject);
          }
          // parse the where clause normally relative to this include.
          const targetModel = this.model.associations[field].target;
          this.constructor
            .addWhere(includeObject, targetModel, targetField, req.query[queryField]);
        } else {
          // its a field of the current model
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
    } else {
      this.filters.limit = 20;
    }
    // console.log('query object built:', this.filters);
  }


  /**
   * @function executeQuery
   *
   * @description executes a findAll() query on this.model, using
   * this.filters as option filters.
   *
   * @returns {Promise} a promise that will resolve to the query results.
   * @memberof ListView
   */
  executeQuery() {
    return this.model.findAndCountAll(this.filters);
  }
}
