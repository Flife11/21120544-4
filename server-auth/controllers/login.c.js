const User = require('../models/user.m');

const LoginSubmit = async (req, res, next) => {
    try {        
        const username = req.body.username;        
        
        const databaseUser = User.Get([username], ["Username"]);
        //console.log(databaseUser)
         
        res.status(201).json(databaseUser);
    } catch (error) {
        next(error);
    }
}

const SignInUpdate = async (req, res, next) => {
    try {        
        const username = req.body.username;
        //console.log(username, "signin auth");
        
        User.UpdateSigninStatus(true, [username], ["Username"]);
         
        res.status(201).json({});
    } catch (error) {
        next(error);
    }
}

const LogoutUpdate = async (req, res, next) => {
    try {        
        const username = req.body.username;
        //console.log(username, "signin auth");
        
        User.UpdateSigninStatus(false, [username], ["Username"]);
         
        res.status(201).json({});
    } catch (error) {
        next(error);
    }
}

module.exports = { LoginSubmit, SignInUpdate, LogoutUpdate};
