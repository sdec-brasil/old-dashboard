export default {
  'GET /cities': {
    path: 'Cities.get',
  },
  'GET /cities/:id': {
    path: 'Cities.getById',
  },
  'GET /cities/:id/general-stats': {
    path: 'Cities.generalStats',
  },
  'GET /cities/:id/daily-issuing': {
    path: 'Cities.dailyIssuing',
  },
};
