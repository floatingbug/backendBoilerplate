const {getDB} = require("@config/db");


async function getUser({filter}){
    try{
        const db = await getDB();
        return db.collection("users").findOne(filter);
    }
    catch(error){
        throw error;
    }
}


module.exports = getUser;
