import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'https://localhost:8000/v1';

function formatPropertyToID(obj, property) {
  obj.id = obj[property];
  delete obj[property];
  return obj;
}

function formatCodIbgeToID(obj) {
  return formatPropertyToID(obj, 'codigoMunicipio');
}

function formatTxIDtoID(obj) {
  return formatPropertyToID(obj, 'txId');
}

/**
* @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
* @param {String} resource Name of the resource to fetch, e.g. 'posts'
* @param {Object} params The Data Provider request params, depending on the type
* @returns {Object} { url, options } The HTTP request parameters
*/
const convertDataProviderRequestToHTTP = (type, resource, params) => {
  console.log('$$$$$-1$$$$')
  console.log(type);
  console.log(resource);
  console.log(params);
  console.log('$$$$$0$$$$')
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_ONE:
      switch(resource) {
        case 'invoices': {
          console.log(type);
          console.log(resource);
          console.log(params);
          return { url: `${API_URL}/${resource}/${params.id}` };
        }

        default: {
          return { url: `${API_URL}/${resource}/${params.id}` };
        }
      }
      
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
        filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
      return {
        url: `${API_URL}/${resource}/${params.id}`,
        options: { method: 'PUT', body: JSON.stringify(params.data) },
      };
    case CREATE:
      return {
        url: `${API_URL}/${resource}`,
        options: { method: 'POST', body: JSON.stringify(params.data) },
      };
    case DELETE:
      return {
        url: `${API_URL}/${resource}/${params.id}`,
        options: { method: 'DELETE' },
      };
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

/**
* @param {Object} response HTTP response from fetch()
* @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
* @param {String} resource Name of the resource to fetch, e.g. 'posts'
* @param {Object} params The Data Provider request params, depending on the type
* @returns {Object} Data Provider response
*/
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
  const { headers, json } = response;
  console.log('######1#####')
  console.log(response);
  console.log(type);
  console.log(resource);
  console.log(params);
  console.log('#####2######')
  switch (type) {
    case GET_LIST:
      switch(resource) {
        case 'invoices': {
          return {
            data: json.data.map(formatTxIDtoID),
            total: parseInt(json.meta.count),
          };
        }

        case 'cities': {
          return {
            data: json.data.map(formatCodIbgeToID),
            total: parseInt(json.meta.count),
          }
        }

        default: {
          return {
            data: json.data.map(x => x),
            total: parseInt(json.meta.count),
          };
        }
      } 
    case CREATE:
      return { data: { ...params.data, id: json.id } };
    default:
      switch (resource) {
        case 'invoices': {
          return { data: formatTxIDtoID(json) };
        }
        case 'cities': {
          return { data: formatCodIbgeToID(json) };
        }
        default: {
          return { data: json };
        }
      }
      
  }
};

/**
* @param {string} type Request type, e.g GET_LIST
* @param {string} resource Resource name, e.g. "posts"
* @param {Object} payload Request parameters. Depends on the request type
* @returns {Promise} the Promise for response
*/
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils;
  const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
  return fetchJson(url, options)
    .then(response => {
      return convertHTTPResponseToDataProvider(response, type, resource, params)
    });
};