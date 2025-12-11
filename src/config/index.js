const dotenv = require('dotenv');
const helmetConfig = require("./helmetConfig");
const rateLimitConfig = require("./rateLimitConfig");
const corsConfig = require("./corsConfig");


dotenv.config();

const env = process.env.NODE_ENV || 'development';


module.exports = {
    env,
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'appdb',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'change_this',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change_this_too',
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
    jsonConfig: {limit: "10kb"},
    urlencodedConfig: {limit: "10kb", extended: true},
    helmetConfig,
    rateLimitConfig,
    corsConfig,
};
