import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  // custom error obj{}.
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "🔴 Something went wrong.. Try again later.",
  };

  //! Old code - for reference

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({
  //     msg: err.message,
  //   });
  // }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   err,
  // });

  //! Refactored code - better/friendly error outputs.

  if (err.name === "ValidationError") {
    // Validation Err.
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    // Duplicate Err.
    customError.msg = `🔴 Duplicate value entered for ${Object.keys(err.keyValue)} field. Please choose another value`;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

export default errorHandlerMiddleware;

// Example output on PostMan upon duplicate entry (by the same email, duplicate error):
// {
//     "msg": "🔴 Duplicate value entered for email field. Please choose another value"
// }
