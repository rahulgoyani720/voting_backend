const express = require("express");
const crouter = express.Router();
const candidate_controller = require("../controller/candidate_controller");
const header_middleware = require("../middleware/header_middleware");

// add to data database
crouter.post("/candidate",header_middleware.CheckAuthToken,candidate_controller.AddCandidate);

// add to data update database
crouter.post("/candidate/:id",header_middleware.CheckAuthToken,candidate_controller.CandidateUpdate);

// add to data update database
crouter.delete("/delete/:id",header_middleware.CheckAuthToken,candidate_controller.DeleteCandidate);

module.exports = crouter;