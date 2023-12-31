const express = require('express');
const router = express.Router();
const { LoginSubmit, SignInUpdate, LogoutUpdate } = require('../controllers/login.c');

router.post('/signin', SignInUpdate);
router.post('/logout', LogoutUpdate);
router.post('/', LoginSubmit);

module.exports = router;