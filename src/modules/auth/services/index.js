const signup = require('./signup');
const login = require('./login');
const refreshToken = require('./refreshToken');
const sendVerificationEmail = require("./sendVerificationEmail");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
    signup,
    login,
    refreshToken,
    sendVerificationEmail,
    resendVerificationEmail,
};
