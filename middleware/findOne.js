const { readFileJson } = require('./readFile');

const findInFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = JSON.parse(await readFileJson());
    const askedFile = file.find((e) => e.id.toString() === id);
    if (askedFile === undefined) {
      res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(askedFile);
  } catch (err) {
    res.status(500).json({ errorMensage: err });
  }
};

module.exports =  findInFile ;