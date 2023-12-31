const User = require('../models/user.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const RegisterSubmit = async (req, res, next) => {
    try {
        const Username = req.body.username;
        const Password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const respond = {code: 0};
        console.log(Password, confirmPassword, req.body);
        if (!(Password==confirmPassword)) {
            respond.error3 = 'Mật khẩu không giống nhau';
            respond.code = 1;
        }
        //console.log(new User({Username, Password}), "he");
        if (User.checkExistsUser(new User({Username, Password}))==true) {
            respond.error1 = 'Tài khoản đã tồn tại';
            respond.code = 1;
        }
        if (respond.code===0) {
            const HashPassword = await bcrypt.hash(Password, saltRounds);
            //console.log(new User({Username, "Password": HashPassword, "Log": false}));
            User.Add(new User({Username, "Password": HashPassword, "Log": false}));
        } 
        res.status(201).json(respond);
    } catch (error) {
        next(error);
    }
}

module.exports = { RegisterSubmit };
