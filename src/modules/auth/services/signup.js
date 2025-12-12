const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const config = require('../../../config');
const model = require('../models');

const signAsync = promisify(jwt.sign);

module.exports = async ({ name, email, password }) => {
    const existing = await model.findByEmail({ email });
    if (existing) {
        throw { status: 409, message: 'Email already exists' };
    }

    const hash = await bcrypt.hash(password, config.bcryptSaltRounds);

    // Create email verification token
    const emailToken = crypto.randomBytes(32).toString("hex");

    // Create user in DB
    const createdUser = await model.create({
        name,
        email,
        password: hash,
        emailVerified: false,
        emailToken
    });

    // Tokens for authentication (not for email verification)
    const accessToken = await signAsync(
        { id: createdUser._id },
        config.jwtAccessSecret,
        { expiresIn: config.accessTokenExpiresIn }
    );

    const refreshToken = await signAsync(
        { id: createdUser._id },
        config.jwtRefreshSecret,
        { expiresIn: config.refreshTokenExpiresIn }
    );

    return {
        user: {
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            emailToken: createdUser.emailToken,
        },
        accessToken,
        refreshToken,
    };
};
