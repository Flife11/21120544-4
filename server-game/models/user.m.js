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
}