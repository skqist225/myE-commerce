module.exports = class NotFoundError extends Error {
    statusCode = 404;

    constructor(message) {
        super();

        this.message = message;
    }

    serializeErrors() {
        return [
            {
                message: `404 ${this.message}`,
            },
        ];
    }
};
