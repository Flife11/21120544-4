const User = require('../models/user.m');

const UpdateIcon = async (req, res, next) => {
    try {   
        console.log("update", 1);
        const {Image, username} = req.body;
        //console.log(Image, username, 1);
        User.Update(["Image"], [Image], ["Username"], [username]);
        //console.log(databaseUser);
         
        res.redirect('http://localhost:21544/profile');
    } catch (error) {
        next(error);
    }
}

const UpdateProfile = async (req, res, next) => {
    try {                
        const {username, Nickname, Name, Xcolor, Ycolor, Boardcolor} = req.body
        
        User.Update(["Nickname", "Name", "Xcolor", "Ycolor", "Boardcolor"], [Nickname, Name, Xcolor, Ycolor, Boardcolor], ["Username"], [username]);        
                
        res.redirect('http://localhost:21544/profile');
    } catch (error) {
        next(error);
    }
}

module.exports = { UpdateIcon, UpdateProfile };
