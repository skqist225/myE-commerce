const express = require('express');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/database');
const errorsMiddleware = require('./middlewares/errors');
const app = express();

//Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION')
    require('dotenv').config({ path: '../backend/config/config.env' });

connectDatabase();

//Use extentions (UE)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//End of UE

//--------------------------------------
//Import all routes (IAR)
const routes = require('./routes');

const applyRoute = route => {
    app.use('/api', route);
};

routes.forEach(route => applyRoute(route));
//End of

// app.use(errorsMiddleware);
app.use(express.static(__dirname));

app.listen(process.env.PORT, () => {
    console.log(
        `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
    );
});
