const db = require('../ulliti/db');
//const tbName = 'Users';
const getCol = ["Username", "Password", "Log", "Name", "Nickname", "Chesscolor", "Boardcolor", "Image"];
module.exports = class User {
    constructor(p) {
        this.Username = p.Username;
        this.Password = p.Password;
        this.Log = p.Log;
        this.Name = p.Name;
        this.Nickname = p.Nickname;
        this.Chesscolor = p.Chesscolor;
        this.Boardcolor = p.Boardcolor;
        this.Image = p.Image;
        this.Score = p.Score;
    }

    static checkExistsUser(user) {
        const data = db.checkExist('Username', user.Username);
        //console.log(data)
        return data;
    }

    static checkLogin(user) {
        const data = db.Get(['Username', 'Password'], ['Username'], [user.Username]);
        if (data.length==0) return null;
        else return (new User(data[0]));
    }

    static Get(values, cols) {
        const data = db.Get(getCol, cols, values);
        if (data.length==0) return null;
        return (new User(data[0]));
    }

    static GetAll() {
        return db.GetAll();
    }

    static Add(user) {
        db.Add(['Username', 'Password', "Log"], user);
    }

    static Update(col, val, w_col, w_val) {
        db.Update(col, val, w_col, w_val);
    }

    static UpdateSigninStatus(status, userVal, userCol) {
        db.Update(["Log"], [status], [userCol], [userVal]);
    }
}