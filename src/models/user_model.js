const mongoose = require("mongoose");

//define the user schema

const userschema = new mongoose.Schema({
    user_id: {
        type: BigInt,
        primaryKey: true,
        autoIncrement: true
    },
    user_token: {
        type: String,
        allowNull: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unqiue: true
    },

    auth_token: {
        type: String,
        allowNull: true
    },
    role: {
        type: String,
        enum: ["voter","admin"],
        default: "voter"
    },
    isvoted: {
        type: Boolean,
        default: false
    }

});

const user = mongoose.model("User",userschema);

module.exports = user;