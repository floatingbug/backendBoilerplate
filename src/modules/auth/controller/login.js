const catchAsync = require("../../../utils/catchAsync");
const service = require("../../auth/services");

module.exports = catchAsync(async (req, res) => {
    const { nameOrEmail, password } = req.body;

    const result = await service.login({ nameOrEmail, password });

    return res.status(200).json(result);
});
