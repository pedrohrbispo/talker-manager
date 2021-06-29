const crypto = require('crypto');
const Joi = require('joi');

// Gera um token usando a biblioteca crypto
const generateToken = () => new Promise((resolve, reject) => {
  crypto.randomBytes(12, (err, buffer) => {
    if (err) {
      reject(err);
    } else {
      resolve(buffer.toString('base64'));
    }
  });
});

let tokenToSend = '';
// Gera um token quando inicia o servidor
const startToken = async () => {
  tokenToSend = await generateToken();
console.log(tokenToSend);
}; 
// Valida o email usando a biblioteca Joi
const validateEmailWithJoi = async (email) => {
  const schema = Joi.object({
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  });
    const value = await schema.validateAsync({ email });
    return value;
};
// Verifica se a senha tem o a quantidade certa de digitos
const verifyIfIsnotEmpty = (password, res) => {
    if (password.length === 0) {
      res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
};

// Lida com o erro do email, usando a mensagem vina da biblioteca Joi
const handleEmailError = (email, message, res) => {
  if (message.includes('must be a valid')) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (email === undefined) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (email.length === 0) res.status(400).json({ message: 'O campo "email" é obrigatório' });
};

// Valida a senha
const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else {
    verifyIfIsnotEmpty(password, res);
    if (password.length > 6) next();
  }
};

// Valida o email
const validateEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const value = await validateEmailWithJoi(email);
    console.log(value);
    res.status(200).json({ token: tokenToSend });
  } catch (e) {
    console.log(e);
    const { message } = e.details[0]; // erro vindo da biblioteca Joi
    if (message.search(/email/i)) {
      handleEmailError(email, message, res);
    }
  }
};

module.exports = { startToken, validatePassword, validateEmail, tokenToSend };
