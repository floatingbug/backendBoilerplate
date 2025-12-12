const { getDb } = require('../../../db/mongo');

module.exports = async ({ name, email, password, emailVerified, emailToken }) => {
    const db = getDb();

    const user = {
        name,
        email,
        password,
        emailVerified,
        emailToken,
    };

    const result = await db.collection('users').insertOne(user);

    return {
        _id: result.insertedId,
        ...user
    };
};
