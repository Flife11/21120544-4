module.exports = class CustomError extends Error{
    constructor(msg, sc) {
        super(msg);
        this.statusCode = sc;
    }
}