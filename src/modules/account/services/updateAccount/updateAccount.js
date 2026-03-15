const models = require("../../models");
const changeEmail = require("./changeEmail");
const bcrypt = require("bcrypt");
const config = require("../../../../config");


module.exports = async ({userId, changes}) => {
    const messages = {};
    const errorMessages = {};
    const updated = [];

    if(changes.name){
        const result = await models.updateName({
            newName: changes.name,
            userId,
        });

        if(result.matchedCount === 0) errorMessages.name = "User not found";
        else if(result.modifiedCount === 0) errorMessages.name = "Name is identical to the current one.";
        else {
            messages.name = "Name has been changed.";
            updated.push("name");
        }
    }
    
    if(changes.email){
        const changeEmailResult = await changeEmail({
            userId,
            email: changes.email,
        });

        if(!changeEmailResult.success){
            errorMessages.email = changeEmailResult.message;
        }
        else{
            messages.email = changeEmailResult.message;
            updated.push("email");
        }
    }

    if(changes.password){
        const passwordHash = await bcrypt.hash(
            changes.password,
            config.bcryptSaltRounds
        );

        const updatePasswordResult = await models.updatePassword({
            newPassword: passwordHash,
            userId,
        });

        if(updatePasswordResult.matchedCount === 0) errorMessages.password = "User not found";
        else if(updatePasswordResult.modifiedCount === 0) errorMessages.password = "Password is identical to the current one.";
        else {
            messages.password = "Password has been changed.";
            updated.push("password");
        }
    }

    return {messages, errorMessages, updated};
};
