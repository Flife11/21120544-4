const express = require('express');
const { GetProfile } = require('../controllers/get.c');
const router = express.Router();

router.post('/profile', GetProfile);
router.post('/profile', UpdateProfile);

module.exports = router;