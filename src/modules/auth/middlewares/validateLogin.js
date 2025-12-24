const validator = require("validator");

module.exports = (req, res, next) => {
    let { nameOrEmail, password } = req.body;

    nameOrEmail = nameOrEmail?.trim();
    password = password?.trim();

    if (!nameOrEmail || !password) {
        return res.status(400).json({ message: "Name or email and password are required" });
    }

    // If input contains "@": treat as email
    if (nameOrEmail.includes("@")) {
        if (!validator.isEmail(nameOrEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
    }
    else {
        // Validate "name"
        if (!validator.isLength(nameOrEmail, { min: 3, max: 50 })) {
            return res.status(400).json({ message: "Name must be between 3 and 50 characters" });
        }

        if (!/^[a-zA-Z0-9._-]+$/.test(nameOrEmail)) {
            return res.status(400).json({
                message: "Name may only contain letters, numbers, dots, underscores or hyphens"
            });
        }
    }

    next();
};
