const express = require('express');
const router = express.Router();
const { RegisterRender, RegisterSubmit } = require('../controllers/register.c');

router.get('/', RegisterRender);
router.post('/checkRegister', RegisterSubmit);

module.exports = router;