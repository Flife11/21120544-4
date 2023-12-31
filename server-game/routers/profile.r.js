const express = require('express');
const { ProfileRender } = require('../controllers/profile.c');
const router = express.Router();

router.get('/', ProfileRender);

module.exports = router;