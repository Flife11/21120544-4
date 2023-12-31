const Game = require('../models/game.m');

const GameRender = async (req, res, next) => {      
    try {
        if (Game.checkExist("Host", req.session.passport.user)) {

        } else {
            Game.Add(["Host", "Guess"], [req.session.passport.user, ''])
        }

        const room = Game.Get(["Host", "Guess"], ["Host"], [req.session.passport.user]);
        res.render('TicTacToe', {
            pcss: () => 'css/tictactoeCSS',
            chatCSS: () => 'css/emptyCSS',

        });
    } catch (error) {
        next(error);
    }
}

module.exports = {GameRender};
