const {Joi} = require('celebrate');

module.exports = Joi.number()
    .min(1)
    .max(23);
