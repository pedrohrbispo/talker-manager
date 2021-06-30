const fs = require('fs').promises;
const { getToken } = require('../middleware/validateLogin');

async function readFileJson() {
    const file = await fs.readFile('talker.json', 'utf-8');
    return file;  
}

async function writFileJson(newfile) {
  await fs.writeFile('talker.json', JSON.stringify(newfile));
}

const validToken = (token) => {
    const currentToken = getToken();
    if (token !== currentToken) return false;
    return true;
};

const validNameLength = (name) => {
  if (name.length < 3) return false;
  return true;
};

const validNameIsFill = (name) => {
  if (name.length === 0) return false;
  return true;
};

const validAgeIsFill = (age) => {
  if (age.length === 0) return false;
  return true;
};

const ageAllowed = (age) => {
  if (age < 18) return false;
  return true;
};

const verifyIfExist = (param) => {
  if (param === undefined) return false;
  return true;
};

const verifyIfDateIsAllowed = (date) => {
  const regexDate = new RegExp('\\d{2}/\\d{2}/\\d{4}');
  const dateOk = regexDate.test(date);
  if (!dateOk) return false;
  return true;
};

const verifyTalkRate = (rate) => {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) return false;
  return true;
};

const verifyTalk = (talk) => {
  const { rate, watchedAt } = talk;
  if ((!rate && rate !== 0) !== !watchedAt) return false;
  return true;
};

module.exports = {
  readFileJson,
  validToken,
  validNameLength,
  validNameIsFill,
  validAgeIsFill,
  ageAllowed,
  verifyIfExist,
  verifyTalkRate,
  verifyTalk,
  verifyIfDateIsAllowed,
  writFileJson,
};