const {MongoClient, ObjectId} = require("mongodb");
const url = process.env.MONGO_URL;
let db = null;

const client = new MongoClient(url);


async function connectDB(){
	try{
		await client.connect();
		db = client.db(process.env.APP_NAME);
		console.log("App has been connected to mongod process.");
	}
	catch(error){
		console.log(error);
		process.exit(1);
	}
}

async function getDB(){
	if(!db){
		try{
			await client.connect();
			db = client.db("deskly");
		}
		catch(error){
			console.log(error);
			process.exit(1);
		}
	}

	return db;
}


module.exports = {
	connectDB,
	getDB,
	ObjectId,
	client,
};
