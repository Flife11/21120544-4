const User = require('../models/user.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const RegisterSubmit = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const respond = {code: 0};
        //console.log(password, confirmPassword, req.body);
        if (!(password==confirmPassword)) {
            respond.error3 = 'Mật khẩu không giống nhau';
            respond.code = 1;
        }
        if (User.checkExistsUser(new User(username, password))==true) {
            respond.error1 = 'Tài khoản đã tồn tại';
            respond.code = 1;
        }
        if (respond.code===0) {
            const HashPassword = await bcrypt.hash(password, saltRounds);
            User.Add(new User(username, HashPassword, false));
        } 
        res.status(201).json(respond);
    } catch (error) {
        next(error);
    }
}

module.exports = { RegisterSubmit };
