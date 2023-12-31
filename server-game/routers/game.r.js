const express = require('express');
const router = express.Router();
const { GameRender } = require('../controllers/game.c');

router.get('/', GameRender);


module.exports = router;