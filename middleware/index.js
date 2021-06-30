const { readFile } = require('./readFile');
const findInFile = require('./findOne');
const { validatePassword, validateEmail, getToken, startToken } = require('./validateLogin');

module.exports = {
  readFile,
  findInFile,
  validatePassword,
  validateEmail,
  getToken,
  startToken,
};