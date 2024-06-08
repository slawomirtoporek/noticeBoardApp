const express = require('express');
const adController = require('../controllers/ad.controller');

const router = express.Router();

router.get('/ads', adController.getAll);