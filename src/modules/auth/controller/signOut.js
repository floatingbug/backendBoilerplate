const catchAsync = require("../../../utils/catchAsync");
const config = require("../../../config");


module.exports = catchAsync(async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: config.env === "production",
        secure: true,
        sameSite: "none",
        path: '/auth/refresh',
    });

    return res.status(204).end();
});
