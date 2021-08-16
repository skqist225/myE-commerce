module.exports = class BadRequestError extends Error {
    statusCode = 400;

    constructor(message) {
        super();
        this.message = message;
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
};
