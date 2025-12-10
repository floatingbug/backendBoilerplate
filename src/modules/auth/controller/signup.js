const catchAsync = require('../../../utils/catchAsync');
const service = require('../services');

module.exports = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const result = await service.signup({ name, email, password });

    return res.status(201).json(result);
});
