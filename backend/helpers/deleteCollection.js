const MongoClient = require('mongodb').MongoClient({
    useUnifiedTopology: true,
});
const url = process.env.DB_URI;

// Connect to Mongo

const deleteCollection = collectionName => {
    MongoClient.connect(url, function (error, client) {
        if (error) throw error;
        // Select database
        const dbo = client.db('myEcommerceDB');

        // Drop the collection
        dbo.collection(collectionName).drop(function (err, result) {
            if (err) throw err;
            if (result) console.log('Collection successfully deleted.');
            client.close();
        });
    });
};

module.exports = deleteCollection;
