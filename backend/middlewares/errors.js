import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    //handle invalid mongoose ID error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err?.path}`
        error = new ErrorHandler(message, 404)
    }

    //Handle Validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400)
    }

    //Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
        error = new ErrorHandler(message, 400);
    }

    //handle wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try again !!!`
        error = new ErrorHandler(message, 400);
    }

    //handle expired JWT Error
    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token is expired. Try again !!!`
        error = new ErrorHandler(message, 400);
    }

    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err?.stack,
        });
    }
    if (process.env.NODE_ENV === "PRODUCTION") {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
};