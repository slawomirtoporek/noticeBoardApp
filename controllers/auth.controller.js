const User = require('../models/user');
const getImageFileType = require('../utils/getImageFileType');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const avatar = req.file.filename;
    
    const isPhoneNumberValid = !isNaN(Number(phoneNumber));

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if(login && typeof login === 'string' 
      && password && typeof password == 'string'
      && isPhoneNumberValid
      && avatar && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res.status(409).json({ message: 'User with this login already exists' });
      };

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar, phoneNumber});
      res.status(201).json({ message: 'User created ' + user.login });
    } else {
      res.status(400).json({ message: 'Bad request' });
    };
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).json({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: 'Login successful '});
        } else {
          res.status(400).json({ message: 'Login or password are incorrect' });
        };
      };
    } else {
      res.status(400).send({ message: 'Bad request' });
    };
  } catch(err) {
    res.status(500).json({ message: err });
  }
};