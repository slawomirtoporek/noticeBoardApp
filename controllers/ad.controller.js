const Ad = require('../models/Ad.model');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find();

    if (ads.length === 0) {
      res.status(200).json({ message: 'No ads found'});
    } else {
      res.json(ads);
    };
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};