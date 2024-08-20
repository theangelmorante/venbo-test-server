const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  if (typeof res.status === "function") {
    res.status(status).send({
      status,
      message,
    });
  } else {
    console.error("res.status is not a function. Error details:", {
      status,
      message,
      err,
    });
    next(err); // Llama a next() si res.status no está disponible
  }
};

module.exports = errorMiddleware;
