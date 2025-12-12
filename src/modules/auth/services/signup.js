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
    const user = {
        name,
        email,
        password: hash,
        emailVerified: false,
        emailToken
    };
    const createResult = await model.create({user});
    if(!createResult.acknowledged) throw {status: 500, message: "Failed to create user in db."};

    // Tokens for authentication (not for email verification)
    const accessToken = await signAsync(
        { id: user._id },
        config.jwtAccessSecret,
        { expiresIn: config.accessTokenExpiresIn }
    );

    const refreshToken = await signAsync(
        { id: user._id },
        config.jwtRefreshSecret,
        { expiresIn: config.refreshTokenExpiresIn }
    );

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            emailToken: user.emailToken,
        },
        accessToken,
        refreshToken,
    };
};
