const User = require('../models/user.m');
var fs = require("fs");

const GetProfile = async (req, res, next) => {
    try {                
        const username = req.body.username;
        
        const databaseUser = User.Get([username], ["Username"]);
        //console.log(databaseUser);
         
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
        //console.log(Image, "image");
        fs.readFile(`./server-auth/img/${Image}`, function(err, data) {                        
            try {
                //console.log(data);
                res.status(201).json({"Image": data});
            } catch (error) {
                next(error)
            }
        });         
    } catch (error) {
        next(error);
    }
}

const GetAllUser = async (req, res, next) => {
    try {                
        const all = User.GetAll();
        res.status(201).json({"Users": all});
    } catch (error) {
        next(error);
    }
}
module.exports = {GetProfile, GetProfileImage, GetImageListName, GetAllUser}