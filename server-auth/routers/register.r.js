const express = require('express');
const router = express.Router();
const { RegisterSubmit } = require('../controllers/register.c');

router.post('/', RegisterSubmit);

module.exports = router;