import { limitSettings } from '../../config/config';

// function validPagination(offset, until, limit) {
//   return Number.isInteger(offset) && Number.isInteger(until) && Number.isInteger(limit);
// }

function buildUrl(req, limit, nextOffset, count) {
  // check if there is actually a next/previous page of results
  if (nextOffset < 0) return null;
  if (nextOffset >= count) return null;
  // TODO: treat negative offset and offset too high (with no results left to display)
  const lastPart = req.originalUrl.split('?')[0];
  const queryParams = req.query;
  let url = `${req.protocol}://${req.get('host')}${lastPart}?`;
  Object.keys(queryParams).forEach((key) => {
    if (key !== 'offset' && key !== 'limit') {
      url = `${url}${key}=${queryParams[key]}&`;
    }
  });
  url = `${url}limit=${limit}&offset=${nextOffset}`;
  return url;
}

export default class ResponseList {
  constructor(req, queryResult) {
    this.meta = {
      url: req.baseUrl,
      query: req.query,
      params: req.params,
      time: new Date().valueOf(),
      count: queryResult.count,
    };
    this.data = queryResult.rows;

    // const until = Number(req.query.until) || new Date().valueOf();
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || limitSettings.invoice.get;

    // if (validPagination(offset, until, limit)) {
    this.cursor = {
      // until,
      offset,
      limit,
      next: buildUrl(req, limit, offset + limit, this.meta.count),
      previous: buildUrl(req, limit, offset - limit, this.meta.count),
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
