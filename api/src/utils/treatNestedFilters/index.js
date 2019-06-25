function treatNestedFilters(filter, where) {
  const reg = /[, ]+/;
  if (where && filter && Object.keys(filter)) {
    const nesteds = filter.split(reg).filter(x => x.indexOf('.') !== -1);
    nesteds.forEach((key) => {
      const splitted = key.split('.');
      const a = splitted[0];
      const b = splitted[1];
      if (where[a] && where[a][b]) {
        where[`$${key}$`] = where[a][b];
      }
    });
    nesteds.forEach((key) => {
      delete where[key.split('.')[0]];
    });
  }
}

export default treatNestedFilters;
