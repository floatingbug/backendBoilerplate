const db = require("../../../db/mongo");

module.exports = async ({ name }) => {
    const collection = await db.getCollection("users");
    return collection.findOne({ name });
};
