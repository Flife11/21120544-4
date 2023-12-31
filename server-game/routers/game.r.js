const express = require('express');
const router = express.Router();
const { GameRender, GameCreate, GameOptionsCreate } = require('../controllers/game.c');

router.get('/', GameRender);
router.get('/create', GameCreate);
// router.get('/create/options', GameOptionsCreate);

module.exports = router;