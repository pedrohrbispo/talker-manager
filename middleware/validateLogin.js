const crypto = require('crypto');

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
};

const getToken = () => tokenToSend;

// Valida o email
function validEmail(email) {
  return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
}

// Verifica se a senha tem o a quantidade certa de digitos
const verifyIfIsnotEmpty = (password, res) => {
    if (password.length === 0) {
      return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
};

// Valida a senha
const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  verifyIfIsnotEmpty(password, res);
  if (password.length > 6) {
      next();
  }
};

// Valida o email
const validateEmail = async (req, res) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  res.status(200).json({ token: tokenToSend });
};

module.exports = { startToken, validatePassword, validateEmail, getToken };
