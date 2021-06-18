const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(({ connection }) => {
            console.log(
                `MongoDB database connected with HOST: ${connection.host}`
            );
        });
};

module.exports = connectDatabase;
