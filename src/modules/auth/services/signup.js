const bcrypt = require("bcrypt");
const crypto = require("crypto");
const config = require("../../../config");
const model = require("../models");
const sendVerificationEmail = require("./sendVerificationEmail");

module.exports = async ({ name, email, password }) => {
    const existing = await model.findByNameOrEmail({ name, email });

    if (existing) {
        throw {
            status: 409,
            message: "Email already exists",
        };
    }

    const passwordHash = await bcrypt.hash(
        password,
        config.bcryptSaltRounds
    );

    // Generate email verification token
    const emailToken = crypto.randomBytes(32).toString("hex");
    const emailTokenHash = crypto
        .createHash("sha256")
        .update(emailToken)
        .digest("hex");

    const emailTokenExpiresAt = new Date(
        Date.now() + 30 * 60 * 1000 // 30 minutes
    );

    const user = {
        name,
        email,
        password: passwordHash,
        emailVerified: false,
        emailTokenHash,
        emailTokenExpiresAt,
        createdAt: new Date(),
    };

    const result = await model.create({ user });

    if (!result.acknowledged) {
        throw {
            status: 500,
            message: "Failed to create user",
        };
    }

    // Send verification email
    await sendVerificationEmail({
        email,
        token: emailToken,
    });

    return true;
};
