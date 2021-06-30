const {  
  validAgeIsFill,
  ageAllowed,
  verifyIfExist,
} = require('../helpers');

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!verifyIfExist(age) || !validAgeIsFill(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!ageAllowed(age)) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = validateAge;