const tbName = 'Users';
module.exports = class User {
    constructor(un, pw, log) {
        this.Username = un;
        this.Password = pw;
        this.Log = log;
        this.Name = '';
        this.Nickname = '';
        this.Chesscolor = '';
        this.Boardcolor = '';
        this.Image = '';
    }    
}