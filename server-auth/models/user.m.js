const db = require('../ulliti/db');
const tbName = 'Users';
module.exports = class User {
    constructor(un, pw, log) {
        this.Username = un;
        this.Password = pw;
        this.Log = log;
        this.Name = '';
        this.Email = '';
        this.DOB = '';
        this.Permission = '';
    }

    static checkExistsUser(user) {
        const data = db.checkExist(tbName, 'Username', user.Username);
        console.log(data)
        return data;
    }

    static checkLogin(user) {
        const data = db.Get(tbName, ['Username', 'Password'], ['Username'], [user.Username]);
        if (data.length==0) return null;
        else return (new User(data[0].Username, data[0].Password));
    }

    static Get(values, cols) {
        const data = db.Get(tbName, ['Username', 'Password', "Log"], cols, values);
        if (data.length==0) return null;
        return (new User(data[0].Username, data[0].Password));
    }

    static Add(user) {
        db.Add(tbName, ['Username', 'Password', "Log"], user);
    }

    static UpdateSigninStatus(userCol, userVal) {
        db.Update(tbname, ["Log"], [true], [userCol], [userVal]);
    }
}