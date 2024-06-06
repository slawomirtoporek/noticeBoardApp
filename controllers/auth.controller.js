const User = require('../models/User.model');
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
          req.session.user = { id: user._id, login: user.login };
          res.status(200).json({ message: 'Login successful ' + user.login });
        } else {
          res.status(400).json({ message: 'Login or password are incorrect' });
        };
      };
    } else {
      res.status(400).json({ message: 'Bad request' });
    };
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (req.session.user.login && req.session.user.id) {
      const user = await User.findById(req.session.user.id);
      if (user) {
        return res.json(user);
      } else {
        return res.status(400).json({ message: "User not found" });
      };
    } else {
      return res.status(401).json({ message: "Failed to authenticate" });
    };
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};