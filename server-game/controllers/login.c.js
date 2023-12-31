const User = require('../models/user.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const LoginRender = async (req, res, next) => {      
    try {
        res.render('login', {
            pcss: () => 'css/loginCSS',
            chatCSS: () => 'css/emptyCSS',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {LoginRender};
