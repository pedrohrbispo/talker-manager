const fs = require('fs').promises;

async function readFileJson() {
  const file = await fs.readFile('talker.json', 'utf-8');
  return file;
}

const validToken = () => {
  //  const currentToken = getToken();
  //  if (token === undefined) return res.status(401).json({ message: 'Token não encontrado' });
  //  if (token !== currentToken) return res.status(401).json({ message: 'Token inválido' });
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
  if (age.length < 18) return false;
  return true;
};

const verifyIfExist = (param) => {
  if (param === undefined) return false;
};

// const verifyIfDateIsAllowed = (date) => {
//   const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
//   const dateOk = regexDate.test(date);
//   if (!dateOk) return false;
//   return true;
// };

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
};