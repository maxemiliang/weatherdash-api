module.exports = (err, req, res, next) => {
  res.status(500);
  console.log(err);
  return res.json({
    statusCode: 500,
    message: 'An error occured',
  });
};
