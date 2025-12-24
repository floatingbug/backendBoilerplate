const nodemailer = require("nodemailer");
const config = require("../../../config");

module.exports = async ({ email, token }) => {
    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: config.smtpSecure,
        auth: {
            user: config.smtpUser,
            pass: config.smtpPass,
        },
    });

    const verifyUrl = `${config.clientBaseUrl}/auth/verify-email/callback?token=${token}`;

    await transporter.sendMail({
        from: config.mailFrom,
        to: email,
        subject: "Verify your email address",
        html: `
            <h1>Verify your email</h1>
            <p>Click the link below to verify your email address:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>
        `,
    });
};
