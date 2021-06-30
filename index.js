const express = require('express');
const bodyParser = require('body-parser');
const {
  readFile,
  findInFile,
  validatePassword,
  validateEmail,
  startToken,
  validateAge,
  validateTalk,
  validateName,
  createTalker,
  validateToken,
  updateTalker,
} = require('./middleware/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
startToken();

// const consolareque = (req, res, next) => {
//   console.log(req.headers.authorization);
//   next();
// };

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', readFile);

app.get('/talker/:id', findInFile);

app.post('/login', validatePassword, validateEmail);

app.post('/talker', validateToken, validateName, validateAge, validateTalk, createTalker);

app.put('/talker/:id', validateToken, validateName, validateAge, validateTalk, updateTalker);

app.listen(PORT, () => {
  console.log('Online');
});
