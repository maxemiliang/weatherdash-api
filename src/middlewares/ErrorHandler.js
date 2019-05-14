module.exports = (error, req, res, next) => {
  res.status(error.statusCode || 500);
  res.json(error);
};
