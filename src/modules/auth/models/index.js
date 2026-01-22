const findByEmail = require("./findByEmail");
const findByName = require("./findByName");
const create = require("./create");
const findByEmailToken = require("./findByEmailToken");
const updateById = require("./updateById");
const findByNameOrEmail = require("./findByNameOrEmail");
const setPasswordResetToken = require("./setPasswordResetToken");
const findUserByPasswordResetToken = require("./findUserByPasswordResetToken");
const resetPassword = require("./resetPassword");

module.exports = {
    findByEmail,
    findByName,
    findByEmailToken,
    create,
    updateById,
    findByNameOrEmail,
    setPasswordResetToken,
    findUserByPasswordResetToken,
    resetPassword,
};
