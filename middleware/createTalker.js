const { readFileJson, writFileJson } = require('../helpers');

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  try {
    const file = JSON.parse(await readFileJson());
    const newFile = {
      id: file.length + 1,
      name,
      age,
      talk,
    };
    file.push(newFile);
    await writFileJson(file);

    res.status(201).send(newFile);
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: 'Não foi possivel adicionar um novo item no arquivo' });
  }
};

module.exports = createTalker;