const express = require('express');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/database');
const errorsMiddleware = require('./middlewares/errors');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');

//Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION')
    require('dotenv').config({ path: '../backend/config/config.env' });

connectDatabase();

const corsOptions = {
    //To allow requests from client
    origin: ['http://localhost:3000', 'http://127.0.0.1', 'http://localhost:2903'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
};

//Use extentions (UE)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname));
//End of UE

//--------------------------------------
//Import all routes (IAR)
const routes = require('./routes');

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

const applyRoute = route => {
    app.use('/api/v1', route);
};

routes.forEach(route => applyRoute(route));

// const credentials = {
//     key: fs.readFileSync('./server.key', 'utf8'),
//     cert: fs.readFileSync('./server.crt', 'utf8'),
// };

//End of

// app.use(errorsMiddleware);

// const httpsServer = https.createServer(credentials, app);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----');
    console.log(error);
    console.log('----- Exception origin -----');
    console.log(origin);
});

process.on('unhandledRejection', err => {
    console.log(err);

    server.close(() => {
        process.exit(1);
    });
});
