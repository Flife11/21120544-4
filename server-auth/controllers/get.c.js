const User = require('../models/user.m');
var fs = require("fs");

const GetProfile = async (req, res, next) => {
    try {                
        const username = req.body.username;
        
        const databaseUser = User.Get([username], ["Username"]);
        console.log(databaseUser);
         
        res.status(201).json(databaseUser);
    } catch (error) {
        next(error);
    }
}

const GetImageListName = async (req, res, next) => {
    try {                                
        res.status(201).json({"data": ['white.jpg', 'black.jpg', 'red.jpg', 'blue.jpg', 'pink.jpg']});
    } catch (error) {
        next(error);
    }
}

const GetProfileImage = async (req, res, next) => {
    try {                
        const Image = req.body.Image;

        fs.readFile(`./server-auth/img/${img1.jpg}`, function(err, data) {                        
            res.status(201).json({"data": data});
        });
         
    } catch (error) {
        next(error);
    }
}
module.exports = {GetProfile, GetProfileImage, GetImageListName}