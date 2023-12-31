const db = require('../ulliti/db');
//const tbName = 'Users';
const getCol = ["Username", "Password", "Log", "Name", "Nickname", "Xcolor", "Ycolor", "Boardcolor", "Image", "Score"];
module.exports = class User {
    constructor(p) {
        this.Username = p.Username;
        this.Password = p.Password;
        this.Log = p.Log || false;
        this.Name = p.Name || '';
        this.Nickname = p.Nickname || '';
        this.Xcolor = p.Xcolor || '#FF6347';
        this.Ycolor = p.Ycolor || '#33DBFF';
        this.Boardcolor = p.Boardcolor || '#FFFFFF';
        this.Image = p.Image || 'Profile.png';
        this.Score = p.Score || 0;
    }

    static checkExistsUser(user) {
        console.log(user);
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
        db.Add([...getCol], new User(user));
    }

    static Update(col, val, w_col, w_val) {
        db.Update(col, val, w_col, w_val);
    }

    static UpdateSigninStatus(status, userVal, userCol) {
        db.Update(["Log"], [status], [userCol], [userVal]);
    }
}