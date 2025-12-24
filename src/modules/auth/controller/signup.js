const catchAsync = require('../../../utils/catchAsync');
const service = require('../services');
const sendVerificationEmail = require('../services/sendVerificationEmail');

module.exports = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const result = await service.signup({ name, email, password });

    return res.status(201).json({
        message: "Signup successful. Please check your email to verify your account.",
    });
});
