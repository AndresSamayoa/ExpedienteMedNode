
module.exports = {
    notFoundError: (message) => {
      const error = new Error(message);
  
      error.statusCode = 404;
  
      return error;
    },
  
    badRequestError: (message) => {
      const error = new Error(message);
  
      error.statusCode = 400;
  
      return error;
    },
    
    notAuthorizedError: (message) => {
      const error = new Error(message);
  
      error.statusCode = 401;
  
      return error;
    },
  }