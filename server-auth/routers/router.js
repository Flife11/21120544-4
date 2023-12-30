const express = require('express');
const router = express.Router();
const LoginRouter = require('./login.r');
const RegisterRouter = require('./register.r');
const GGAuth = require('./ggauth.r');

router.use('/gg', GGAuth);
router.use('/login', LoginRouter);
router.use('/register', RegisterRouter);

module.exports = router;