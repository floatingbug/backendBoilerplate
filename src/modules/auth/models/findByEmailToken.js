const { getDb } = require('../../../db/mongo');


module.exports = async ({ emailToken }) => {
    const db = getDb();
    return db.collection('users').findOne({ emailToken });
};
