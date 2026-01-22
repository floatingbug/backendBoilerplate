const { getDb, ObjectId } = require("../../../db/mongo");

module.exports = async ({ userId, hashedToken }) => {
	const db = getDb();
	const now = new Date();

	return db.collection("users").findOneAndUpdate(
		{
			_id: new ObjectId(userId),
			pendingEmailToken: hashedToken,
			pendingEmailExpiresAt: { $gt: now },
			pendingEmail: { $exists: true },
		},
		[
			{
				$set: {
					email: "$pendingEmail",
					emailVerified: true,
				},
			},
			{
				$unset: [
					"pendingEmail",
					"pendingEmailToken",
					"pendingEmailExpiresAt",
				],
			},
		],
		{
			returnDocument: "after",
		}
	);
};
