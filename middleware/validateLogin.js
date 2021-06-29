const crypto = require('crypto');
const Joi = require('joi');

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

const startToken = async () => {
  tokenToSend = await generateToken();
console.log(tokenToSend);
}; 

const validateEmailWithJoi = async (email) => {
  const schema = Joi.object({
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  });
    const value = await schema.validateAsync({ email });
    return value;
};

const verifyIfIsnotEmpty = (password, res) => {
    if (password.length === 0) {
      res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
};

const handleEmailError = (email, message, res) => {
  if (message.includes('must be a valid')) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (email === undefined) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (email.length === 0) res.status(400).json({ message: 'O campo "email" é obrigatório' });
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  console.log(password, 'senha');
  if (password === undefined) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else {
    verifyIfIsnotEmpty(password, res);
    if (password.length > 6) next();
  }
};

const validateEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const value = await validateEmailWithJoi(email);
    console.log(value);
    res.status(200).json({ token: tokenToSend });
  } catch (e) {
    console.log(e);
    const { message } = e.details[0];
    if (message.search(/email/i)) {
      handleEmailError(email, message, res);
    }
  }
};

module.exports = { startToken, validatePassword, validateEmail };
