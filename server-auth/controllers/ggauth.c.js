const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user.m');

const urlGG = 'https://accounts.google.com/o/oauth2/v2/auth'
const client_id = '432203837390-1n5o26t8sa7ed21e6bdvdedpao14bptf.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uri = 'https://localhost:3003/gg/auth';
const response_type = 'code';
const scopes = ['https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'];
const include_granted_scopes = true;
const prompt = "consent";
const Auth = (req, res) => {
    const queries = new URLSearchParams({
        response_type,
        redirect_uri,
        client_id,
        scope: scopes.join(' '),
        include_granted_scopes,
        prompt
    })
    res.redirect(`${urlGG}?${queries.toString()}`)
}

const grant_type = 'authorization_code';
const jwt = require('jsonwebtoken');
const redirectAuth = async (req, res, next) => {
    try {
        const code = req.query.code;
    
        const options = {
            code,
            grant_type,
            client_id,
            client_secret,
            redirect_uri,
        }
    
        const rs = await fetch('https://accounts.google.com/o/oauth2/token', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
    
        })
        const data = await rs.json();
        console.log(data);
        console.log(jwt.decode(data.id_token));
    
        const email = jwt.decode(data.id_token).email;
        if (User.checkExistsUser(new User(email, email)) == true) {
            // Cập nhật trạng thái đăng nhập thành true
            User.UpdateSigninStatus([email], ["Username"]);        
        }
        else {
            const HashPassword = await bcrypt.hash(email, saltRounds);
            User.Add(new User(email, HashPassword, false));        
        }
    
        const rs1 = await fetch('http://localhost:3000/login', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": email,
                    "password": email
                })
            });
            console.log(111);
        res.redirect('http://localhost:3000/');
    } catch (error) {
        next(error);
    }
};

module.exports = { Auth, redirectAuth };