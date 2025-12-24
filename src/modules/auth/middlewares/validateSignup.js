const validator = require("validator");

function validateSignUp(req, res, next) {
    const { name, email, password } = req.body;

    // Name
    if (!name || validator.isEmpty(name.trim())) {
        return res.status(400).json({ message: "Name is required" });
    }

    // Email
    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    // Password basic length check
    if (!password || !validator.isLength(password, { min: 8 })) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Password: uppercase, lowercase, number — NO special char required
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
        return res.status(400).json({
            message: "Password must include uppercase, lowercase, and at least one number"
        });
    }

    next();
}

module.exports = validateSignUp;

