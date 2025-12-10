const model = require('../models');
module.exports = async ({ userId }) => model.findById({ userId });
