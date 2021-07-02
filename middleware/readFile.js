const { readFileJson } = require('../helpers');

const readFile = async (req, res) => {
  try {
    const file = JSON.parse(await readFileJson());
    if (file.length === 0) return res.status(200).json([]);

    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ errorMensage: err });
  }
};

module.exports = { readFile, readFileJson };