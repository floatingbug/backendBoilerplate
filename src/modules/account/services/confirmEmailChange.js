const crypto = require("crypto");
const models = require("../models");

module.exports = async ({ token }) => {
    if (!token) {
        throw {
            status: 400,
            message: "Conformation token is required.",
        };
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await models.findUserByEmailConfirmationToken({
        hashedToken,
    });

    if (!user) {
        throw {
            status: 400,
            message: "Invalid or expired confimation token.",
        };
    }

    if (!user.pendingEmailExpiresAt || user.pendingEmailExpiresAt < new Date()) {
        throw {
            status: 400,
            message: "Confirmation token has expired.",
        };
    }

    const result = await models.confirmPendingEmailChange({
        userId: user._id,
    });

    if (result.modifiedCount === 0) {
        throw {
            status: 500,
            message: "Email change could not be confirmed.",
        };
    }

    return {
        success: true,
        newEmail: user.pendingEmail,
        message: "Email address has been successfully updated.",
    };
};
