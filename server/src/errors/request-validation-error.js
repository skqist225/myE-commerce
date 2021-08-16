module.exports = class RequestValidationError extends Error {
    statusCode = 400;

    constructor(errors) {
        super();
        this.errors = errors;
    }

    serializeErrors() {
        return this.errors.map(({ msg, param }) => {
            return {
                field: param,
                message: msg,
            };
        });
    }
};
