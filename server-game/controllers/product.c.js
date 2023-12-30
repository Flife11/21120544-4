const User = require('../models/user.m');
const bcrypt = require('bcrypt');

const ProductRender = async (req, res, next) => {    
    res.render('product', {
        pcss: () => 'css/productCSS'
    })
}

module.exports = {
    ProductRender
}