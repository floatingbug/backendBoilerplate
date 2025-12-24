const findByEmail = require("./findByEmail");
const findByName = require("./findByName");
const create = require("./create");
const findByEmailToken = require("./findByEmailToken");
const updateById = require("./updateById");
const findByNameOrEmail = require("./findByNameOrEmail");

module.exports = {
    findByEmail,
    findByName,
    findByEmailToken,
    create,
    updateById,
    findByNameOrEmail,
};
