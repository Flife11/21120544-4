const express = require('express');
const router = express.Router();
const { ProductRender } = require('../controllers/product.c');

router.use((req, res, next) => {
    if (req.isAuthenticated()) {   
        //console.log(req.session.passport, "hello1");
        return next();
    }
    // console.log(req.session.passport, "hello")
    res.redirect('/login');
});

router.get('/', ProductRender);


module.exports = router;