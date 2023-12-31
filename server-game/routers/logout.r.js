const express = require('express');
const router = express.Router();
const passport = require('passport')

router.post('/', (req, res, next) => {
    try {
        console.log(req.session.passport, 1);
        fetch('https://localhost:3003/login/logout', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": req.session.passport.user,
            })
        });
        req.logout((err) => {
            if (err) { return next(err); }            
        });
        //return res.redirect('http://localhost:21544/login');
        res.status(201).json({code: 1});
    } catch (error) {
        next(error);
    }
})

// router.post('/', passport.unuseauthenticate('my', {
//     failureRedirect: '/login'
// }) , (req, res) => {    
//     res.redirect('/');
// });

module.exports = router;