const signup = require('./signup');
const login = require('./login');
const refreshToken = require('./refreshToken');
const verifyEmail = require("./verifyEmail");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
    signup,
    login,
    refreshToken,
    verifyEmail,
    resendVerificationEmail,
};
