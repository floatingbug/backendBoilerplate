const { getDb } = require('../../../db/mongo');

module.exports = async (doc) => {
    const db = getDb();
    const result = await db.collection('users').insertOne(doc);
    return { _id: result.insertedId, ...doc };
};
