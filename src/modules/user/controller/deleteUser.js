const service = require("../services");
const catchAsync = require("../../../utils/catchAsync");


module.exports = catchAsync(async (req, res) => {
    const result = await service.deleteUser({userId: req.user.id});

    return res.json(result);
});
