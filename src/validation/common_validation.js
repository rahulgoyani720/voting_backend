const user = require("../models/user_model");


const isUserExistWithEmail = async (email) => {
    const findall =
        await user.findOne({
            where: {
                user_email: email,
            }
        })
    if (findall) {
        return false;
    } else {
        return true;
    }
}


module.exports = {
    isUserExistWithEmail
}