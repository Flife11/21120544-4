const User = require('../models/user.m');

const UpdateIcon = async (req, res, next) => {
    try {        
        const Image = req.body.Image;
        const username = req.body.username;
        
        User.Update([Image], ["Image"], [username], ["Username"]);
        //console.log(databaseUser);
         
        res.status(201).json({});
    } catch (error) {
        next(error);
    }
}

const UpdateProfile = async (req, res, next) => {
    try {                
        const {username, Nickname, Name} = req.body
        
        User.Update(["Nickname", "Name"], [Nickname, Name], ["Username"], [username]);
        //console.log(databaseUser);
                
        res.status(201).json({code: 1});
    } catch (error) {
        next(error);
    }
}

module.exports = { UpdateIcon, UpdateProfile };
