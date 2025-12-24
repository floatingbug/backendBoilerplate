const crypto = require("crypto");
const models = require("../models");
const sendVerificationEmail = require("./sendVerificationEmail");

module.exports = async ({ email }) => {
    const user = await models.findByEmail({ email });

    if (!user || user.emailVerified) {
        return;
    }

    const emailToken = crypto.randomBytes(32).toString("hex");

    const emailTokenHash = crypto
        .createHash("sha256")
        .update(emailToken)
        .digest("hex");

    const emailTokenExpiresAt = new Date(
        Date.now() + 30 * 60 * 1000 // 30 minutes
    );

    const update = {
        emailTokenHash,
        emailTokenExpiresAt,
    };

    await models.updateById({
        id: user._id,
        update,
    });

    await sendVerificationEmail({
        email: user.email,
        token: emailToken,
    });

    return true;
};
