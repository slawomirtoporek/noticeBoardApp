const express = require('express');
const ads = require('../controllers/ad.controller');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();
const upload = require('../utils/imageUpload');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.post('/ads', upload.single('image'), authMiddleware, ads.newAd);

module.exports = router;