const express = require("express");
const allRouter = express.Router();
const urouter = require("./user_router");
const crouter = require("./candidate_router");
const vrouter = require("./voting_router");

allRouter.use("/user",urouter);
allRouter.use("/candidate",crouter);
allRouter.use("/voting",vrouter);



module.exports = allRouter;