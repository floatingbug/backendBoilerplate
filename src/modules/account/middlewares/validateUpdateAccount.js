const validator = require("validator");

module.exports = async (req, res, next) => {
	const changes = req.body;

	// Must be a plain object
	if (
		!changes
		|| typeof changes !== "object"
		|| Array.isArray(changes)
	) {
		return res.status(400).json({
			error: "Invalid changes payload",
		});
	}

	const allowedKeys = ["name", "email", "password"];
	const keys = Object.keys(changes);

	// At least one change required
	if (keys.length === 0) {
		return res.status(400).json({
			error: "No changes provided",
		});
	}

	// Reject unknown fields
	for (const key of keys) {
		if (!allowedKeys.includes(key)) {
			return res.status(400).json({
				error: `Field '${key}' is not allowed`,
			});
		}
	}

	// NAME
	if ("name" in changes) {
		if (typeof changes.name !== "string") {
			return res.status(400).json({
				error: "Name must be a string",
			});
		}

		const trimmedName = changes.name.trim();

		if (!validator.isLength(trimmedName, { min: 1, max: 100 })) {
			return res.status(400).json({
				error: "Name must be between 1 and 100 characters",
			});
		}

		changes.name = trimmedName;
	}

	// EMAIL
	if ("email" in changes) {
		if (typeof changes.email !== "string") {
			return res.status(400).json({
				error: "Email must be a string",
			});
		}

		if (!validator.isEmail(changes.email)) {
			return res.status(400).json({
				error: "Invalid email address",
			});
		}

		const normalizedEmail = validator.normalizeEmail(changes.email);

		if (!normalizedEmail) {
			return res.status(400).json({
				error: "Invalid email address",
			});
		}

		changes.email = normalizedEmail;
	}

	// PASSWORD
	if ("password" in changes) {
		if (typeof changes.password !== "string") {
			return res.status(400).json({
				error: 
                {
                    type: "password",
                    message: "Password must be of type string.",
                }
			});
		}

		if (!validator.isLength(changes.password, { min: 8, max: 128 })) {
			return res.status(400).json({
				error: 
                {
                    type: "password",
                    message: "Password must be between 8 and 128 characters long",
                }
			});
		}

		// Optional: password strength
		if (!validator.isStrongPassword(changes.password, {
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0,
		})) {
			return res.status(400).json({
				error: 
                {
                    type: "password",
                    message: "Password must have lowercase and uppercase characters and at least one number.",
                }
			});
		}
	}

	next();
};
