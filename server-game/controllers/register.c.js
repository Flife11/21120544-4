const User = require('../models/user.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const RegisterRender = async (req, res, next) => {
    try {
        res.render('register', {
            pcss: () => 'css/loginCSS'
        });
    } catch (error) {
        next(error);
    }
}

const RegisterSubmit = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const rs = await fetch('https://localhost:3003/register', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "confirmPassword": confirmPassword
            })  
        });
        const respond = rs.json();
    
        res.status(201).json(respond);
    } catch (error) {
        next(error);
    }
}

module.exports = { RegisterRender, RegisterSubmit };
