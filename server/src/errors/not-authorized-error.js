module.exports = class NotAuthorizedError extends Error {
    statusCode = 401;

    constructor(message) {
        super();
        this.message = message;
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
};
