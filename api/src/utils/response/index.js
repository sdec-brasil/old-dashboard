import { limitSettings } from '../../config/config';

// function validPagination(offset, until, limit) {
//   return Number.isInteger(offset) && Number.isInteger(until) && Number.isInteger(limit);
// }

function nextUrl(url, queryParams) {
  return 'url';
}

function previousUrl(url, queryParams) {
  return 'url';
}

export default class ResponseList {
  constructor(req, queryResult) {
    this.meta = {
      url: req.baseUrl,
      query: req.query,
      params: req.params,
      time: new Date().valueOf(),
    };
    this.data = queryResult;

    // const until = Number(req.query.until) || new Date().valueOf();
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || limitSettings.invoice.get;

    // if (validPagination(offset, until, limit)) {
    this.cursor = {
      // until,
      offset,
      limit,
      next: nextUrl(req.baseUrl, req.query),
      previous: previousUrl(req.baseUrl, req.query),
    };
    // } else {
    //   this.code = 400;
    //   this.err = {
    //     type: 'pagination_error',
    //     path: req.query,
    //   };
    // }
  }

  value() {
    const response = Object.create(null);

    if (this.meta) response.meta = this.meta;
    if (this.cursor) response.cursor = this.cursor;
    if (this.err) response.err = this.err;
    if (this.data) response.data = this.data;

    return response;
  }
}
