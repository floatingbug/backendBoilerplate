const catchAsync = require("../../../utils/catchAsync");
const service = require("../../auth/services");

module.exports = catchAsync(async (req, res) => {
    const { nameOrEmail, password } = req.body;

    const result = await service.login({ nameOrEmail, password });

    // Set refresh token as HttpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
    });

    res.status(200).json(result);
});
