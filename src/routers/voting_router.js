const express = require("express");
const vrouter = express.Router();
const voting_controller = require("../controller/voting_controller");
const header_middleware = require("../middleware/header_middleware");

//voting api
vrouter.post("/vote/:id",header_middleware.CheckAuthToken,voting_controller.VoteUser);

//voting api
vrouter.get("/vote/count",voting_controller.VoteCount);


//get candidate api
vrouter.get("/candidate",voting_controller.GetCandidate);

module.exports = vrouter;