const mongoose = require("mongoose");
const db = {};

const connect = function connect(env) {
    if (env.IS_TEST === "false") {
        return mongoose.connect('mongodb://skypebot-backend.documents.azure.com:10255/skypebot?ssl=true&replicaSet=globaldb', {
                auth: {
                    user: env.COSMODDB_USER,
                    password: env.COSMOSDB_PASSWORD
                },
                useNewUrlParser: true
            })
            .then(() => console.log('Connection to CosmosDB successful'))
            .catch((err) => console.error(err));
    }
    if (env.IS_TEST === "true") {
        return mongoose.connect('mongodb://Kleist534:plant534@ds012889.mlab.com:12889/skypebot', {useNewUrlParser: true})
        .then(() => console.log('Connection to mLabDB successful'))
        .catch((err) => console.error(err));
    }
}

db.connect = connect;
module.exports = db;