const {Joi} = require('celebrate');

module.exports = Joi.string()
    .min(16)
    .max(32)
    .required();
