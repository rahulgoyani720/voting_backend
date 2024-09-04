const user = require("../models/user_model");
const jwt = require('jsonwebtoken');

const GetUserFromUserToken = async (userToken) => {
    const userdata = await user.findOne({

        where: {
            user_token: userToken
        }
    });
    if (userdata) {
        return userdata;
    } else {
        return null;
    }
}


const getUserFromAuthToken = async (token) => {
    const userData = await user.findOne({
        where: {
            auth_token: token,
        }
    });

    if (userData) {
        return userData.dataValues;
    } else {
        return null;
    }
}

const decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token);
        console.log(decoded);
    } catch (err) {
        console.error('Error decoding token:',err);
    }
};

decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yzk0ZjdlNzRlMzdhMWRhODIzMjE2YSIsImlhdCI6MTcyNDQ3NjMxNiwiZXhwIjoxNzU2MDMzOTE2fQ.UQoqTCh0EvBsnifZJPKQq9R6N7d8HydSc8k2QueESbU');
module.exports = {
    GetUserFromUserToken,
    getUserFromAuthToken
}