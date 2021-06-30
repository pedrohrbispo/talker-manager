const {  
  verifyIfExist,
  verifyTalk,
  verifyTalkRate,
  verifyIfDateIsAllowed,
} = require('../helpers');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!verifyIfExist(talk) || !verifyTalk(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!verifyIfDateIsAllowed(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (!verifyTalkRate(talk.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = validateTalk;