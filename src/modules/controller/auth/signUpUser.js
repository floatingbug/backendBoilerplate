const response = require("@utils/response");
const validator = require("validator");
const authService = require("@services/auth");

async function signUpUser(req, res, next) {
    const errors = validate(req.body);

    if (errors.length > 0) {
        return response(res, {
            success: false,
            code: 400,
            errors
        });
    }

    try {
        const result = await authService.signUpUser({
            name: req.body.name,
            email: req.body.email,
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

    const name = payload?.name;
    const email = payload?.email;
    const password = payload?.password;

    //
    // NAME VALIDATION
    //
    if (!name || typeof name !== "string" || validator.isEmpty(name.trim())) {
        errors.push("Name is required.");
    }
    else if (!validator.isLength(name.trim(), { min: 2, max: 50 })) {
        errors.push("Name must be between 2 and 50 characters long.");
    }
    else if (!/^[a-zA-Z0-9 _.-]+$/.test(name.trim())) {
        errors.push("Name contains invalid characters.");
    }

    //
    // EMAIL VALIDATION
    //
    if (!email || typeof email !== "string" || validator.isEmpty(email.trim())) {
        errors.push("Email is required.");
    }
    else if (!validator.isEmail(email.trim())) {
        errors.push("Email format is invalid.");
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

module.exports = signUpUser;
