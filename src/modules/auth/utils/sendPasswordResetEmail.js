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

    const verifyUrl = `${config.clientBaseUrl}/auth/reset-password?token=${token}`;

    await transporter.sendMail({
        from: config.mailFrom,
        to: email,
        subject: "Reset your password.",
        html: `
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>
        `,
    });
};
