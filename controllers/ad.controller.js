const Ad = require('../models/Ad.model');
const getImageFileType = require('../utils/getImageFileType');

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

exports.newAd = async (req, res) => {
  const { title, content, price, location } = req.body;
  const image = req.file.filename;
  const user = req.session.user.id;

  const parsedPrice = parseFloat(price);

  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
  
  try {
    if (title && typeof title === 'string' &&
      content && typeof content === 'string' &&
      !isNaN(parsedPrice) &&
      location && typeof location === 'string' &&
      image && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        const newAd = new Ad({ title, content, publicationDate: new Date(), price: parsedPrice, location, image, user });
        await newAd.save();
        res.json({ message: 'OK' });
    } else {
      res.status(400).json({ message: 'All fields are required' });
    };
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};