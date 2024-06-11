const Ad = require('../models/Ad.model');
const fs = require('fs');
const path = require('path');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate('user');

    if (ads.length === 0) {
      res.status(200).json({ message: 'No ads found'});
    } else {
      res.json(ads);
    };
  } catch(err) {
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
  } catch(err) {
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
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const userId = req.session.user.id;

    const ad = await Ad.findById(adId);
    
    if(ad) {
      if(ad.user._id.toString() === userId) {
        await Ad.findByIdAndDelete(adId);
        res.json({ message: 'Advertisement has been deleted' });
      } else {
        res.json({ message: 'Only the owner of this ad can remove it' });
      };
    } else {
      res.status(404).json({ message: 'Not found...' });
    };
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateAd = async (req, res) => {
  const { title, content, price, location } = req.body;
  const user = req.session.user.id;
  const adId = req.params.id;

  const parsedPrice = parseFloat(price);

  let image;
  let fileType = 'unknown';

  if (req.file) {
    image = req.file.filename;
    fileType = await getImageFileType(req.file);
  };

  const ad = await Ad.findById(adId);
    
  try {
    if(ad) {
      if(ad.user._id.toString() === user) {
        if (title && typeof title === 'string' &&
          content && typeof content === 'string' &&
          !isNaN(parsedPrice) &&
          location && typeof location === 'string') {
            
          const updateFields = { title, content, publicationDate: new Date(), price: parsedPrice, location, image, user };
            
          if (image && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            const oldImage = ad.image;
            updateFields.image = image;

            if (oldImage && oldImage !== image) {
              const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', oldImage);
              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              };
            };
          } else if (!image) {
            updateFields.image = ad.image;
          };

          await Ad.updateOne({ _id: adId }, { $set: updateFields });
            
          res.json({ message: 'OK' });
        } else {
          res.status(400).json({ message: 'All fields are required' });
        };
      } else {
        res.status(403).json({ message: 'Only the owner of this ad can update it' });
      };
    } else {
      res.status(404).json({ message: 'Not found...' });
    };
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getBySearchPhrase = async (req, res) => {
  try {
      const searchPhrase = req.params.searchPhrase;
      const ads = await Ad.find({ title: { $regex: searchPhrase, $options: 'i' }}).populate('user');
      if(ads) {
        res.json(ads);
      } else {
        res.json({ message: 'No ads matching the given phrase were found...' })
      }
  } catch (err) {
      res.status(500).json({ message: err });
  }
};