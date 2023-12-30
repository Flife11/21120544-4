const express = require('express');
const router = express.Router();
const { LoginRender, LoginSubmit, SignInUpdate } = require('../controllers/login.c');

router.get('/', LoginRender);
router.post('/signin', SignInUpdate);
router.post('/', LoginSubmit);

module.exports = router;