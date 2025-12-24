const jwt = require('jsonwebtoken');
const config = require('../../../config');

module.exports = async ({ refreshToken }) => {
    try {
        const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);

        const accessToken = jwt.sign({ id: decoded.id }, config.jwtAccessSecret, {
            expiresIn: config.accessTokenExpiresIn
        });

        return { accessToken };
    }
    catch (err) {
        throw { status: 401, message: 'Session expired. Please sign in again.' };
    }
};
