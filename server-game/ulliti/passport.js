const passport = require('passport');
const { MyStrategy } = require('../ulliti/customPPS')
const User = require('../models/user.m')
const bcrypt = require('bcrypt');
const { use } = require('../routers/login.r');

passport.serializeUser((user, done) => {
    done(null, user.Username)
})

passport.deserializeUser(async (username, done) => {
    // console.log(username);
    const rs = await fetch('https://localhost:3003/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,                
            })        
        });

    const u = await rs.json();
    
    if (!u) {
        return done('invalid');
    }
    done(null, u)
})

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new MyStrategy(async (un, pw, done) => {
        const u = await User.Get([un], ['Username']);
        let auth = false;
        if (u) {
            auth = await bcrypt.compare(pw, u.Password);
        }
        if (u && auth) {
            auth = (u.Username==un)
        }
        if (auth) {
            return done(null, u);
        }
        done('invalid auth');
    }, {
        username: 'username',
        password: 'password'
    }))
}