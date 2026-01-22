const service = require("../services");
const catchAsync = require("../../../utils/catchAsync");
const config = require("../../../config");


module.exports = catchAsync(async (req, res) => {
    const result = await service.deleteUser({userId: req.user.id});
    
    res.clearCookie('refreshToken', {
        httpOnly: config.env === "production",
        secure: true,
        sameSite: "none",
        path: '/auth/refresh',
    });

    return res.json(result);
});
