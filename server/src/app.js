const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const NotFoundError = require('./errors/not-found-error');
const RequestValidationError = require('./errors/request-validation-error');
const BadRequestError = require('./errors/bad-request-error');
const NotAuthorizedError = require('./errors/not-authorized-error');
const ForbiddenError = require('./errors/forbidden-error');

const app = express();
app.use(cookieParser());
require('dotenv').config({ path: path.join(path.dirname(__dirname), '/.env') });
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:2903'],
        credentials: true,
        exposedHeaders: ['set-cookie'],
    })
);

app.use(express.static(__dirname));

console.log(path.join(__dirname, '/uploads/images/'));

routes.forEach(route => app.use('/api/v1', route));

app.all('*', (req, res) => {
    throw new NotFoundError('PAGE NOT FOUND');
});

app.use((err, req, res, next) => {
    if (
        err instanceof RequestValidationError ||
        err instanceof NotFoundError ||
        err instanceof BadRequestError ||
        err instanceof NotAuthorizedError ||
        err instanceof ForbiddenError
    ) {
        res.status(err.statusCode).send(err.serializeErrors());
    }

    console.log(err);

    // res.status(400).json([{ message: err }]);
});

module.exports = app;
