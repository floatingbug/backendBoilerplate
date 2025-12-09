const {getDB} = require("@config/db");

async function addUser({doc}){
    try{
        const db = await getDB();
        return db.collection("users").insertOne(doc);
    }
    catch(error){
        throw error;
    }
}

module.exports = addUser;
