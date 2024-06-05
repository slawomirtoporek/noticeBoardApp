const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth.controller');
const upload = require('../utils/imageUpload');

router.post('/register', upload.single('avatar'), auth.register);
router.post('/login', auth.login);

module.exports = router;