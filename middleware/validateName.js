const {  
  validNameLength,
  validNameIsFill,
  verifyIfExist,
} = require('../helpers');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!verifyIfExist(name) || !validNameIsFill(name)) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (!validNameLength(name)) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = validateName;