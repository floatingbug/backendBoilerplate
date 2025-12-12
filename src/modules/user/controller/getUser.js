const catchAsync = require('../../../utils/catchAsync');
const service = require('../services');

module.exports = catchAsync(async (req, res) => {
    const result = await service.getUser({ userId: req.user.id });
    return res.json(result);
});
