const { readFileJson, writFileJson } = require('../helpers');

const updateTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  try {
    const file = JSON.parse(await readFileJson());
    const index = file.findIndex((talker) => talker.id.toString() === id);
    file[index].name = name;
    file[index].age = age;
    file[index].talk.rate = talk.rate;
    file[index].talk.watchedAt = talk.watchedAt;
    await writFileJson(file);
    res.status(200).send(file[index]);
  } catch (e) {
    res.status(200).json({ message: 'Não foi possivel adicionar um novo item no arquivo' });
  }
};

module.exports = updateTalker;