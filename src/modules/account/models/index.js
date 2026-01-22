const confirmEmailChange = require("./confirmEmailChange");
const setPendingEmail = require("./setPendingEmail");
const updateName = require("./updateName");
const updatePassword = require("./updatePassword");
const getUserById = require("./getUserById");
const confirmPendingEmailChange = require("./confirmPendingEmailChange");
const findUserByEmailConfirmationToken = require("./findUserByEmailConfirmationToken");

module.exports = {
    confirmEmailChange,
    setPendingEmail,
    updateName,
    updatePassword,
    getUserById,
    confirmPendingEmailChange,
    findUserByEmailConfirmationToken,
};
