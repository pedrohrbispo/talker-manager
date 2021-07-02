const {  
  validToken,
} = require('../helpers');

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token, 'token');
    if (token === undefined) return res.status(401).json({ message: 'Token não encontrado' });
    if (!validToken(token)) {
      return res.status(401).json({ message: 'Token inválido' });
    } 

  next();
};

module.exports = validateToken;