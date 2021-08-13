const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const cors = require('cors');

const app = express();
require('dotenv').config({ path: path.join(path.dirname(__dirname), '/.env') });
app.use(express.json());
app.use(
    cookieSession({
        name: 'session',
        keys: ['randomstring1', '2ngsitrasvksl'],
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
    })
);
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:2903'],
        credentials: true,
        exposedHeaders: ['set-cookie'],
    })
);
app.use(express.static(path.join(__dirname, '/uploads/images')));

const routes = require('./routes');
routes.forEach(route => app.use('/api/v1', route));

module.exports = app;
