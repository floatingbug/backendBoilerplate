const verifyEmail = require("../services/verifyEmail");
const catchAsync = require("../../../utils/catchAsync");

module.exports = catchAsync(async (req, res) => {
    console.log("test");
    const {emailToken} = req.query;

    if (!emailToken) {
        return res.status(400).json({ message: "Token is required" });
    }

    await verifyEmail({emailToken});

    res.json({ message: "Email verified successfully" });
});
