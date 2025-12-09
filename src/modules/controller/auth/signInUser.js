const response = require("@utils/response");
const validator = require("validator");
const authService = require("@services/auth");

async function signInUser(req, res, next) {
    const errors = validate(req.body);

    if (errors.length > 0) {
        return response(res, {
            success: false,
            code: 400,
            errors
        });
    }

    try {
        const result = await authService.signInUser({
            nameOrEmail: req.body.nameOrEmail,
            password: req.body.password,
        });
        response(res, result);
    }
    catch (error) {
        next(error);
    }
}

function validate(payload) {
    const errors = [];

    const nameOrEmail = payload?.nameOrEmail;
    const password = payload?.password;

    //
    // NAME OR EMAIL VALIDATION
    //
    if (!nameOrEmail || typeof nameOrEmail !== "string" || validator.isEmpty(nameOrEmail.trim())) {
        errors.push("nameOrEmail is required.");
    }
    else {
        const value = nameOrEmail.trim();

        const isEmail = validator.isEmail(value);
        const isName = /^[a-zA-Z0-9 _.-]{2,50}$/.test(value);

        if (!isEmail && !isName) {
            errors.push("nameOrEmail must be a valid email or a valid username (2–50 characters, letters/numbers/._-).");
        }
    }

    //
    // PASSWORD VALIDATION
    //
    if (!password || typeof password !== "string") {
        errors.push("Password is required.");
    }
    else {
        if (!validator.isLength(password, { min: 8, max: 64 })) {
            errors.push("Password must be 8–64 characters long.");
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }

        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain at least one digit.");
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }
    }

    return errors;
}

module.exports = signInUser;
