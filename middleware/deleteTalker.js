const { readFileJson, writFileJson } = require('../helpers');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  try {
    const file = JSON.parse(await readFileJson());
    const newFile = file.filter((talker) => talker.id.toString() !== id);
    await writFileJson(newFile);
    res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (e) {
    res.status(200).json({ message: 'Não foi possivel adicionar um novo item no arquivo' });
  }
};

module.exports = deleteTalker;