const express = require('express');
const { GetProfile, GetImageListName, GetProfileImage, GetAllUser } = require('../controllers/get.c');
const router = express.Router();

router.post('/profile', GetProfile);
router.get('/Image', GetImageListName);
router.post('/Image', GetProfileImage);
router.post('/all', GetAllUser);

module.exports = router;