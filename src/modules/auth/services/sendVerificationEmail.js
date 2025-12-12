const nodemailer = require('nodemailer');
const config = require('../../../config');

module.exports = async ({ user }) => {
    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: config.smtpSecure,
        auth: {
            user: config.smtpUser,
            pass: config.smtpPass
        }
    });

    const verifyUrl = `${config.clientBaseUrl}/auth/verify-email?emailToken=${user.emailToken}`;

    await transporter.sendMail({
        from: config.mailFrom,
        to: user.email,
        subject: 'Verify your email address',
        html: `
            <h1>Verify your email</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>
        `
    });
};
