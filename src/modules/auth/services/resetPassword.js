const crypto = require("crypto");
const bcrypt = require("bcrypt");
const models = require("../models");

module.exports = async ({ token, password }) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await models.findUserByPasswordResetToken({
        hashedToken,
    });

    if (!user) {
        throw {
            status: 400,
            message: "Invalid or expired password reset token.",
        };
    }

    if (user.passwordResetExpiresAt < new Date()) {
        throw {
            status: 400,
            message: "Password reset token has expired.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await models.resetPassword({
        userId: user._id,
        hashedPassword,
    });

    if (result.modifiedCount === 0) {
        throw {
            status: 500,
            message: "Failed to reset password.",
        };
    }

    return {
        message: "Password has been reset successfully.",
    };
};
