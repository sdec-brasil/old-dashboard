const formatErr = (err) => {
  const error = {};
  if (err.name) {
    error.type = err.name;
  }
  if (err.message) {
    error.message = err.message;
  } else if (err.parent && err.parent.sqlMessage) {
    error.message = err.parent.sqlMessage;
  }
  return error;
};


const NotFoundError = {
  code: 404,
  data: {
    error:
     {
       type: 'NotFoundError',
       message: 'Object not Found.',
     },
  },
};

const BadFilterError = {
  code: 400,
  data: {
    error:
     {
       type: 'BadFilterError',
       message: 'Filter query string badly formatted.',
     },
  },
};

export default {
  formatErr,
  NotFoundError,
  BadFilterError,
};
