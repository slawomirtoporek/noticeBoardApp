const Ad = require('../models/Ad.model');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate('user');

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

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('user');
    if (!ad) {
      res.status(404).json({ message: 'Ad not found' });
    } else {
      res.json(ad);
    };
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};