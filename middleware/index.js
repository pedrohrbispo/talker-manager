const { readFile } = require('./readFile');
const findInFile = require('./findOne');
const { validatePassword, validateEmail, getToken, startToken } = require('./validateLogin');
const validateName = require('./validateName');
const validateToken = require('./validateToken');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const createTalker = require('./createTalker');
const updateTalker = require('./updateTalker');
const deleteTalker = require('./deleteTalker');
const searchTerm = require('./searchTerm');

module.exports = {
  readFile,
  findInFile,
  validatePassword,
  validateEmail,
  getToken,
  startToken,
  validateAge,
  validateTalk,
  validateName,
  validateToken,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTerm,
};