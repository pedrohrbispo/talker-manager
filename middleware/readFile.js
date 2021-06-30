const fs = require('fs').promises;

async function readFileJson() {
  const file = await fs.readFile('talker.json', 'utf-8');
  return file;
}

const readFile = async (req, res) => {
  try {
    const file = JSON.parse(await readFileJson());
    if (file.length === 0) res.status(200).json([]);

    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ errorMensage: err });
  }
};

module.exports = { readFile, readFileJson };