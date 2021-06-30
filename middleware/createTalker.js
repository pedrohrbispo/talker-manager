const {  
  validNameLength,
  validNameIsFill,
  validAgeIsFill,
  ageAllowed,
  verifyIfExist,
  verifyIfDateIsAllowed
} = require('../helpers');
// const { getToken } = require('./validateLogin');

const createTalker = (req, res) => {
  const { name, age, talk } = req.body;
  //  const { token } = req.headers.authorization;
  //  validToken(token);
  if (!verifyIfExist(name)) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else if (!verifyIfExist(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (!verifyIfExist(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
    });
  }

  if (!validNameLength(name)) {
    return res.status(400).json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
  }
  if (!validNameIsFill(name)) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (!validAgeIsFill(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!ageAllowed(age)) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  if (!verifyTalk(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
    });
  } 
  if (!verifyIfDateIsAllowed(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'
    });
  }
 
  //  res.status(200);
};

module.exports = { createTalker }