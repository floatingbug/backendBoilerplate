const models = require("../../models");
const { sendVerificationEmail } = require("../../utils");
const config = require("../../../../config");
const crypto = require("crypto");


module.exports = async ({userId, email}) => {
    // get user
    const user = await models.getUserById({ userId });
    if (!user) {
        return {
            success: false,
            message: "User not found.",
        };
    }

    // asserts
    if (config.env === "production" && user.emailChangeLastRequestedAt) {
        const elapsedTime =
            Date.now() - new Date(user.emailChangeLastRequestedAt).getTime();

        if (elapsedTime < config.coolDownConfig.changeEmail.cooldown) {
            return {
                success: false,
                message: "Too many email change requests. Please try again later.",
            };
        }
    }

    // create token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const emailChangeLastRequestedAt = new Date();

    const result = await models.setPendingEmail({
        userId,
        newEmail: email,
        hashedToken,
        expiresAt,
        emailChangeLastRequestedAt,
    });

    if (result.modifiedCount === 0) {
        return {
            success: false,
            message: "Could not initiate email change.",
        };
    }

    await sendVerificationEmail({
        email,
        token: rawToken,
    });

    return {
        success: true,
        message: "Confirmation for the new email has been sent to the new email address.",
    };
}

