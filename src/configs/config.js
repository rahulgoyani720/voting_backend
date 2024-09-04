require("dotenv").config();

let CONFIG = {};

CONFIG.port = process.env.PORT || 3000;

CONFIG.secret_key = process.env.SECRET_KEY || "";

CONFIG.auth_string = process.env.AUTH_STRING || "ASDJASDUDSUERWJASDASDJSDJASDJADS";


CONFIG.db_url = process.env.DB_URL || 'mongodb://localhost:27017/vote_app';

module.exports = CONFIG;