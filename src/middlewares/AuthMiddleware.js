const apiKeys = ['SecretTokenHello', 'SuperDuperToken', 'SuperSecretToken'];

const checkToken = (token) => {
  return apiKeys.includes(token);
};

module.exports = () => {
  return (req, res, next) => {
    let isAuthed = false;
    if (req.body.token) {
      isAuthed = checkToken(req.body.token);
    }
    if (!isAuthed && req.query.token) {
      isAuthed = checkToken(req.query.token);
    }
    if (!isAuthed) {
      res.status(401).json({statusCode: 401, message: 'Unauthorized'});
    } else {
      next();
    }
  };
};
