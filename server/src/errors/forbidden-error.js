module.exports = class ForbiddenError extends Error {
    statusCode = 403;

    constructor(message) {
        super();
        this.message = message;
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
};
