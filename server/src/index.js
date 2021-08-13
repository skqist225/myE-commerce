const app = require('./app');
const mongoose = require('mongoose');

const main = async () => {
    try {
        await mongoose.connect(process.env['DB_URI'], {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Connected to mongoDB successfully');

        process.on('uncaughtException', (error, origin) => {
            console.log('----- Uncaught exception -----');
            console.log(error);
            console.log('----- Exception origin -----');
            console.log(origin);
        });

        process.on('unhandledRejection', err => {
            console.log(err);
        });

        app.listen(process.env.PORT, () => {
            console.log(
                `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
            );
        });
    } catch (error) {
        console.error(error);
    }
};

main();
