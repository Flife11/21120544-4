const User = require('../models/user.m');

const LoginRender = async (req, res, next) => {      
    try {
        res.render('login', {
            pcss: () => 'css/loginCSS'
        });
    } catch (error) {
        next(error);
    }
}

const LoginSubmit = async (req, res, next) => {
    try {        
        const username = req.body.username;        
        
        const databaseUser = User.Get([username], ["Username"]);        
         
        res.status(201).json(databaseUser);
    } catch (error) {
        next(error);
    }
}

const SignInUpdate = async (req, res, next) => {
    try {        
        const username = req.body.username;
        
        User.UpdateSigninStatus([username], ["Username"]);        
         
        res.status(201).json({});
    } catch (error) {
        next(error);
    }
}

module.exports = {LoginRender, LoginSubmit, SignInUpdate};
