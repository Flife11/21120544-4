const Game = require('../models/game.m');
const { fetchFunction } = require('../ulliti/db');

const GameRender = async (req, res, next) => {      
    try {
        const user = req.session.passport.user
        //console.log(user);
        if (!Game.checkExist("Host", user)) {
            res.redirect('/');
        } else {
            //Game.Add(["Host", "Guest"], new Game({"Host": user, "Guest": ''}));        
        }

        const room = Game.Get(["Host", "Guest"], ["Host"], [user]);
        const rs1 = await fetchFunction('https://localhost:3003/login', {"username": user})
        const hostInfo = await rs1.json();
        const rs2 = await fetchFunction('https://localhost:3003/login', {"username": room.Guest})
        const guestInfo = await rs2.json();
        //console.log(hostInfo);
        res.render('TicTacToe', {
            pcss: () => 'css/tictactoeCSS',
            chatCSS: () => 'css/emptyCSS',
            room: room,
            host: hostInfo,
            guest: guestInfo,
            curUser: user
        });
    } catch (error) {
        next(error);
    }
}

const GameCreate = async (req, res, next) => {      
    try {
        const user = req.session.passport.user;
        //console.log(user);
        if (Game.checkExist("Host", user)) {
            res.redirect('/');
            //res.status(201).json({msg: "You already created one game!"});
        } else {
            Game.Add(["Host", "Guest"], new Game({"Host": user, "Guest": ''}));        
            res.redirect('/game');
        }
    } catch (error) {
        next(error);
    }
}

const GameOptionsCreate = async (req, res, next) => {      
    try {
        const user = req.session.passport.user;
        //console.log(user);
        if (Game.checkExist("Host", user)) {
            res.redirect('/');
            //res.status(201).json({msg: "You already created one game!"});
        } else {
            Game.Add(["Host", "Guest"], new Game({"Host": user, "Guest": ''}));        
            res.redirect('/game');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {GameRender, GameCreate, GameOptionsCreate};
