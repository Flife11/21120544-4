const express = require('express');
const router = express.Router();
const LoginRouter = require('./login.r');
const RegisterRouter = require('./register.r');
const ProductRouter = require('./product.r');

router.use('/login', LoginRouter);
router.use('/register', RegisterRouter);
router.use('/', ProductRouter);

module.exports = router;