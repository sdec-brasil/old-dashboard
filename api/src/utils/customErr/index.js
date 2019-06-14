const formatErr = err => ({
  type: err.name,
  message: err.message,
});

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
