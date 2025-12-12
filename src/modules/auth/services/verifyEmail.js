const model = require('../models');

module.exports = async ({emailToken}) => {
    const user = await model.findByEmailToken({emailToken});

    if (!user) {
        throw { status: 400, message: "Invalid or expired verification token" };
    }

    await model.updateById({
        id: user._id,
        update: {
            emailVerified: true,
            emailToken: null
        }
    });

    return true;
};
