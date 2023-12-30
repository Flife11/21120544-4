const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user.m');

const urlGG = 'https://accounts.google.com/o/oauth2/v2/auth'
const client_id = '432203837390-1n5o26t8sa7ed21e6bdvdedpao14bptf.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uri = 'https://localhost:3000/gg/auth';
const response_type = 'code';
const scopes = ['https://www.googleapis.com/auth/userinfo.email', 
'https://www.googleapis.com/auth/userinfo.profile']
router.get('/', (req, res) => {
    console.log(1);
    const queries = new URLSearchParams({
        response_type,
        redirect_uri,
        client_id,
        scope: scopes.join(' ')
    })
    res.redirect(`${urlGG}?${queries.toString()}`)
})

const grant_type = 'authorization_code';
const jwt = require('jsonwebtoken');
router.get('/auth', async (req, res) => {
    //console.log(req.query);
    const code = req.query.code;

    const options = {
        code,
        grant_type,
        client_id,
        client_secret,
        redirect_uri
    }

    const rs = await fetch('https://accounts.google.com/o/oauth2/token', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)

    })
    const data = await rs.json();
    // const email = jwt.decode(data.id_token).email;
    //if ()
    // const HashEmail = await bcrypt.hash(email, saltRounds);
    // User.Add(new User(email, HashEmail));
    // console.log(id);
    // console.log(data);
    // console.log("access_token", jwt.decode(data.access_token))
    // console.log(jwt.decode(data.id_token));
    res.redirect('/product');
})

router.get('/logout', (req, res, next) => {    
    res.redirect('https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://localhost:3000/login');
})

module.exports = router;