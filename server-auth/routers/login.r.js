const express = require('express');
const router = express.Router();
const { LoginSubmit, SignInUpdate } = require('../controllers/login.c');

router.post('/signin', SignInUpdate);
router.post('/', LoginSubmit);

module.exports = router;