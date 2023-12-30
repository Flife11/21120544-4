const db = require('../ulliti/db');
const tbName = 'Users';
module.exports = class User {
    constructor(un, pw) {
        this.Username = un;
        this.Password = pw;
        this.Name = '';
        this.Email = '';
        this.DOB = '';
        this.Permission = '';
    }

    static async checkExistsUser(user) {
        const data = await db.checkExist(tbName, 'Username', user.Username);
        return data.case;
    }

    static async checkLogin(user) {
        const data = await db.Get(tbName, ['Username', 'Password'], ['Username'], [user.Username]);
        if (data.length==0) return null;
        else return (new User(data[0].Username, data[0].Password));
    }

    static async Get(values, cols) {
        const data = await db.Get(tbName, ['ID', 'Username', 'Password'], cols, values);
        if (data.length==0) return null;
        return (new User(data[0].Username, data[0].Password));
    }

    static async Add(user) {
        db.Add(tbName, ['Username', 'Password'], user);
    }
}