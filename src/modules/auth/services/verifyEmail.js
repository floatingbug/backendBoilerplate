const crypto = require("crypto");
const model = require("../models");

module.exports = async ({ token }) => {
    const emailTokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await model.findByEmailToken({ emailTokenHash });
    const now = new Date();

    console.log("user: ", user);

    if (!user || user.emailTokenExpiresAt < now) {
        throw { status: 400, message: "Invalid or expired verification token" };
    }

    await model.updateById({
        id: user._id,
        update: {
            emailVerified: true,
            emailTokenHash: null,
            emailTokenExpiresAt: null,
        },
    });

    return true;
};
