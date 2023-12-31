const express = require('express');
const router = express.Router();
const LoginRouter = require('./login.r');
const RegisterRouter = require('./register.r');
const GGAuth = require('./ggauth.r');
const UpdateRouter = require('./update.r');
const GetRouter = require('./get.r')

router.use('/gg', GGAuth);
router.use('/login', LoginRouter);
router.use('/register', RegisterRouter);
router.use('/update', UpdateRouter);
router.use('/get', GetRouter);

module.exports = router;