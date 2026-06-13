import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/index.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  // custom error obj{}.
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "🔴 Something went wrong.. Try again later.",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  //! Old code - for reference
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   err,
  // });

  //! Refactored code - better
  if (err.code && err.code === 11000) {
    customError.msg = `🔴 Duplicate value entered for ${Object.keys(err.keyValue)} field. Please choose another value`;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

export default errorHandlerMiddleware;

// Example output on PostMan upon duplicate entry (by the same email):
// {
//     "msg": "🔴 Duplicate value entered for email field. Please choose another value"
// }
