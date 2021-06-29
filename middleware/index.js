const { readFile } = require('./readFile');
const findInFile = require('./findOne');
const { validatePassword } = require('./validateLogin');
const { validateEmail } = require('./validateLogin');
const { tokenToSend } = require('./validateLogin');

module.exports = {
  readFile,
  findInFile,
  validatePassword,
  validateEmail,
  tokenToSend,
};