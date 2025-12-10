const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../../../config');
const model = require('../models');

// Promisify jwt.sign, damit wir await nutzen können
const signAsync = promisify(jwt.sign);

module.exports = async ({ name, email, password }) => {
    // Prüfen, ob die E-Mail bereits existiert
    const existing = await model.findByEmail({ email });
    if (existing) {
        throw { status: 409, message: 'Email already exists' };
    }

    // Passwort hashen
    const hash = await bcrypt.hash(password, config.bcryptSaltRounds);

    // User in DB erstellen
    const created = await model.create({ name, email, password: hash });

    // JWT Tokens asynchron erzeugen
    const accessToken = await signAsync(
        { id: created._id },
        config.jwtAccessSecret,
        { expiresIn: config.accessTokenExpiresIn }
    );

    const refreshToken = await signAsync(
        { id: created._id },
        config.jwtRefreshSecret,
        { expiresIn: config.refreshTokenExpiresIn }
    );

    return {
        user: {
            id: created._id,
            name: created.name,
            email: created.email
        },
        accessToken,
        refreshToken
    };
};
