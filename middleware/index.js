const { readFile } = require('./readFile');
const findInFile = require('./findOne');
const { validatePassword, validateEmail, getToken, startToken } = require('./validateLogin');
const { createTalker } = require('./createTalker');

module.exports = {
  readFile,
  findInFile,
  validatePassword,
  validateEmail,
  getToken,
  startToken,
  createTalker,
};