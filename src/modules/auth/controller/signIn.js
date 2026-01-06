const catchAsync = require("../../../utils/catchAsync");
const service = require("../../auth/services");
const config = require('../../../config');

module.exports = catchAsync(async (req, res) => {
    const { nameOrEmail, password } = req.body;

    const result = await service.signIn({ nameOrEmail, password });

    // Set refresh token as HttpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: config.env === "production",
        secure: true,
        sameSite: "none",
        path: '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
    });

    res.status(200).json(result);
});
