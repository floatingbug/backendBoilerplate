const { getDb } = require('../../../db/mongo');
module.exports = async ({ userId }) => {
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) throw { status: 404, message: 'User not found' };
    return { id: user._id, name: user.name, email: user.email };
};
