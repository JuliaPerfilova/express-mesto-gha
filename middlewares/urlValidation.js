const validator = require('validator');
const BadRequestError = require('../utils/errors/BadRequestError');
const { ERROR_MESSAGES } = require('../utils/errorConstants');

module.exports.urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw (new BadRequestError(ERROR_MESSAGES.WRONG_URL));
  }
  return value;
};
