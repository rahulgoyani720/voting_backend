const express = require("express");
const urouter = express.Router();
const user_controller = require("../controller/user_controller");
const header_middleware = require("../middleware/header_middleware");
//register api
urouter.post("/register",user_controller.SingUp);

//register api
urouter.post("/login",user_controller.LogIn);

//profile fill api
urouter.post("/profile",header_middleware.CheckAuthToken,user_controller.Profile);

//profile update api
urouter.put("/profile/:id",header_middleware.CheckAuthToken,user_controller.ProfileUpdate);

module.exports = urouter;