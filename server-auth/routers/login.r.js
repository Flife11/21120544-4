const express = require('express');
const router = express.Router();
const { LoginRender, LoginSubmit } = require('../controllers/login.c');
const passport = require('passport')

router.get('/', LoginRender);
router.post('/', LoginSubmit);

module.exports = router;