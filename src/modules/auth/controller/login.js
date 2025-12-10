const catchAsync = require('../../../utils/catchAsync');
const service = require('../services');

module.exports = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await service.login({ email, password });

    return res.json(result);
});
