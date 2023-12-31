const express = require('express');
const router = express.Router();
const LoginRouter = require('./login.r');
const RegisterRouter = require('./register.r');
const ProductRouter = require('./product.r');
const ProfileRouter = require('./profile.r');
const LogOutRouter = require('./logout.r');
const RankRouter = require('./rank.r');
const GameRouter = require('./game.r');

router.use('/login', LoginRouter);
router.use('/register', RegisterRouter);
router.use('/logout', LogOutRouter);
router.use('/', ProductRouter);
router.use('/profile', ProfileRouter);
router.use('/rank', RankRouter);
router.use('/game', GameRouter);

module.exports = router;