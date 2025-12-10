const bcrypt = require('bcrypt');
const config = require('../../../config');
const model = require('../models');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Promisify jwt.sign für await
const signAsync = promisify(jwt.sign);

module.exports = async ({ email, password }) => {
    const user = await model.findByEmail({ email });

    if (!user) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // Tokens asynchron erzeugen
    const accessToken = await signAsync({ id: user._id }, config.jwtAccessSecret, {
        expiresIn: config.jwtAccessExpiresIn
    });

    const refreshToken = await signAsync({ id: user._id }, config.jwtRefreshSecret, {
        expiresIn: config.refreshTokenExpiresIn
    });

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        accessToken,
        refreshToken
    };
};
