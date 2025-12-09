const jwt = require("jsonwebtoken");
const response = require("@utils/response");

async function authUser(req, res, next) {
    const authHeader = req.headers["authorization"];

    const error = validateTokenFormat(authHeader);
    if (error) {
        return response(res, {
            success: false,
            code: 401,
            errors: [error]
        });
    }

    const token = authHeader.split(" ")[1];

    let user;
    try {
        user = await decodePayload(token);
    }
    catch (err) {
        return response(res, {
            success: false,
            code: 401,
            errors: ["Invalid or expired token"]
        });
    }

    req.user = user;

    next();
}

function validateTokenFormat(header) {
    if (!header) {
        return "No authorization header provided.";
    }

    const parts = header.split(" ");

    if (parts.length !== 2) {
        return "Invalid authorization header format.";
    }

    if (parts[0].toLowerCase() !== "bearer") {
        return "Authorization scheme must be Bearer.";
    }

    if (!parts[1] || typeof parts[1] !== "string") {
        return "No token provided.";
    }

    return null;
}

function decodePayload(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }

            resolve(decoded);
        });
    });
}

module.exports = authUser;
