const crypto = require("crypto");
const models = require("../models");
const config = require("../../../config");
const { sendPasswordResetEmail } = require("../utils");

module.exports = async ({ email }) => {
    const user = await models.findByEmail({ email });

    if (!user) return;

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const expiresAt = new Date(
        Date.now() + config.authConfig.passwordResetExpiresIn
    );

    await models.setPasswordResetToken({
        userId: user._id,
        passwordResetTokenHash: hashedToken,
        passwordResetExpiresAt: expiresAt,
    });

    await sendPasswordResetEmail({
        email,
        token: rawToken,
    });
};
