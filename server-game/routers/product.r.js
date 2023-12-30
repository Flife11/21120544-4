const express = require('express');
const router = express.Router();
const { ProductRender } = require('../controllers/product.c');

// router.use((req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }    
//     res.redirect('/login');
// });

router.get('/', ProductRender);


module.exports = router;