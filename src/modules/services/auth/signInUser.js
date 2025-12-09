const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("@models/auth");

async function signInUser({ nameOrEmail, password }) {
    try {
        //
        // get user
        //
        const filter = {
            $or: [
                { name: nameOrEmail },
                { email: nameOrEmail }
            ]
        };

        const user = await authModel.getUser({ filter });

        if (!user) {
            return {
                success: false,
                code: 401,
                errors: ["User not found."]
            };
        }

        //
        // password verification
        //
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                code: 401,
                errors: ["Invalid password."]
            };
        }

        //
        // create token
        //
        const payload = {
            userId: user._id,
            name: user.name,
            email: user.email
        };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        return {
            success: true,
            code: 200,
            message: "Successfully signed in.",
            data: {
                token
            }
        };
    }
    catch (error) {
        throw error;
    }
}


module.exports = signInUser;
