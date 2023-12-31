const express = require('express');
const { UpdateIcon, UpdateProfile } = require('../controllers/update.c');
const router = express.Router();

router.post('/icon', UpdateIcon);
router.post('/profile', UpdateProfile);

module.exports = router;