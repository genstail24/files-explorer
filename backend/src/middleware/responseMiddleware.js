export const responseMiddleware = () => (context) => {
    context.success = (data, message = "Success") => {
      return {
        message,
        status: 200,
        data,
      };
    };
  
    context.error = (message, status = 500, error = null) => {
      return {
        message,
        status,
        data: null,
        error,
      };
    };
  
    return context;
  };
  