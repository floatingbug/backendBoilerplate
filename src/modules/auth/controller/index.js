const signUp = require('./signUp');
const signIn = require('./signIn');
const refreshToken = require('./refreshToken');
const verifyEmail = require("./verifyEmail");
const resendVerificationEmail = require("./resendVerificationEmail");
const signOut = require("./signOut");

module.exports = {
    signUp,
    signIn,
    signOut,
    refreshToken,
    verifyEmail,
    resendVerificationEmail,
};
