const express = require('express');
const router = express.Router();
const { RankRender } = require('../controllers/rank.c');

router.get('/', RankRender);


module.exports = router;