const { MongoClient, ObjectId } = require('mongodb');
const config = require('../config');

let client;
let db;

async function connect() {
    if (db) {
        return db;
    }

    client = new MongoClient(config.mongoUri);

    await client.connect();

    db = client.db(config.dbName);

    return db;
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected. Call connect() first.');
    }

    return db;
}

module.exports = {
    connect,
    getDb,
    ObjectId,
    _client: () => client
};
