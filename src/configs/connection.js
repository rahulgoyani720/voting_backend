const mongoose = require("mongoose");
const CONFIG = require("./config");

//mongodb database connection

const connectiondb = async () => {
    try {

        await mongoose.connect(CONFIG.db_url);
        console.log(`database connection successfully ${mongoose.connection.host}`);

    } catch (error) {
        console.log(`DB connection error ${error}`);

    }
}


module.exports = connectiondb;
