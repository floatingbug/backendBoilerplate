module.exports = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required",
        });
    }

    if (typeof email !== "string") {
        return res.status(400).json({
            message: "Email must be a string",
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
            message: "Invalid email format",
        });
    }

    // overwrite with normalized value
    req.body.email = normalizedEmail;

    next();
};
