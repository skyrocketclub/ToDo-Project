class AppError extends Error {
  // Using the ES6 pattern for defining constructors
  // You want to instantiate the AppError object by supplying the error message and the statusCode of choice....
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    //Putting the statusCode in quotes does a Number -> String type coercion
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
