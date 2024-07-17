const errorHandler = (req, res, err, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    mssg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export {errorHandler};
