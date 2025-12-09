const bcrypt = require("bcrypt");
const authModel = require("@models/auth");

async function signUpUser({ name, email, password }) {
    try {
        const now = new Date();

        //
        // check if name or email already exists
        //
        const existingUserFilter = {
            $or: [
                { name },
                { email }
            ]
        };

        const existingUser = await authModel.getUser({ filter: existingUserFilter });

        if (existingUser) {
            return {
                success: false,
                code: 400,
                errors: ["Name or email is already in use."]
            };
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const doc = {
            name,
            email,
            password: hashedPassword,
            createdAt: now,
            updatedAt: now
        };

        const result = await authModel.addUser({ doc });

        return {
            success: true,
            code: 201,
            message: "User has been signed up.",
            data: {
                userId: result.insertedId
            }
        };
    }
    catch (error) {
        throw error;
    }
}

module.exports = signUpUser;
