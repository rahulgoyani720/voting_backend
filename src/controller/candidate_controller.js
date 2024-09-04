const user = require("../models/user_model");
const candidate = require("../models/candidate_model");

const checkAdminRole = async (userID) => {
    try {
        const data = await user.findById(userID);
        return user.role === "admin";

    } catch (error) {
        return false;
    }
}
const AddCandidate = async (req,res) => {
    try {

        if (!checkAdminRole(req.id)) {
            return res.status(403).send({ status: 0,message: "user not admin role" });
        }
        const requestdata = req.body;
        const newcandidate = new candidate(requestdata);

        const response = await newcandidate.save();
        console.log("data saved");
        res.status(201).send({ status: 1,message: "ok",data: response });
    } catch (error) {
        console.log('Error in update user API:',error);
        res.status(500).send({ status: 0,message: "Error in update user API",error });
    }
}


// candidate data update
const CandidateUpdate = async (req,res) => {
    try {
        if (!checkAdminRole(req.id)) {
            return res.status(403).send({ status: 0,message: "user not admin role" });
        }

        const candidateId = req.params.id;
        const UpdateCandidateData = req.body;

        const response = await candidate.findByIdAndUpdate(candidateId,UpdateCandidateData,{
            new: true,
            runValidators: true
        });

        // if (!response) {
        //     return res.status(404).send({ status: 0,message: "candidate not found" });
        // }
        console.log("candidate data update");

        res.status(201).send({ status: 1,message: "ok",data: response })
    } catch (error) {
        console.log('Error in update user API:',error);
        res.status(500).send({ status: 0,message: "Error in update user API",error });
    }
}


// candidagte deleted

const DeleteCandidate = async (req,res) => {
    try {
        if (!checkAdminRole(req,user.id)) {
            return res.status(403).send({ status: 0,message: "user not admin role" });
        }

        const candidateId = req.params.id;

        const response = await candidate.findByIdAndDelete(candidateId);

        if (!response) {
            return res.status(404).send({ status: 0,message: "candidate not found" });
        }

        console.log("candidate deleted");

        res.status(201).send({ status: 1,message: "done",data: response })

    } catch (error) {
        console.log('Error in update user API:',error);
        res.status(500).send({ status: 0,message: "Error in update user API",error });
    }
}
module.exports = {
    AddCandidate,
    CandidateUpdate,
    DeleteCandidate
}