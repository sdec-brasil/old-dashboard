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
       type: 404,
       message: 'Not Found',
     },
  },
};

export default {
  formatErr,
  NotFoundError,
};
