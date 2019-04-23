const {Joi} = require('celebrate');

module.exports = () => {
  return (req, res, next) => {
    const schema = Joi.string()
        .min(12)
        .max(64)
        .required();

    const result = Joi.validate(req.body.token, schema);
    if (result.error || req.body.token !== 'SecretTokenHello!') {
      console.log(result.error);
    }
    next();
  };
};
