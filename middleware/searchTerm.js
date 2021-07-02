const { readFileJson } = require('./readFile');

const searchTerm = async (req, res, next) => {
  const { q } = req.query;

  if (q === undefined || q === '') return next();
  try {
    const file = JSON.parse(await readFileJson());
    const askedFile = file.filter((e) => e.name.includes(q));
    if (askedFile.length === 0) return res.status(200).json([]);

    res.status(200).json(askedFile);
  } catch (err) {
    res.status(500).json({ errorMensage: err });
  }
};

module.exports = searchTerm;