const Candidate = require('../models/candidate_model.js');
const User = require("../models/user_model");

const VoteUser = async (req,res) => {
    const candidateID = req.params.id; // Ensure this matches the route parameter
    const userID = req.user.id;

    console.log('Candidate ID from params:',candidateID);
    console.log('User ID from token:',userID);

    try {
        if (!candidateID) {
            return res.status(400).send({ status: 0,message: "Candidate ID is missing" });
        }

        console.log('Querying candidate with ID:',candidateID);
        const candidatedata = await Candidate.findById(candidateID);
        console.log('Candidate Data:',candidatedata);

        if (!candidatedata) {
            return res.status(404).send({ status: 0,message: "Candidate not found" });
        }

        const userdata = await User.findById(userID);
        if (!userdata) {
            return res.status(404).send({ status: 0,message: "User not found" });
        }

        if (userdata.isvoted) {
            return res.status(400).send({ status: 0,message: "You have already voted" });
        }

        if (userdata.role === "admin") {
            return res.status(403).send({ status: 0,message: "Admin not allowed to vote" });
        }

        candidatedata.votes.push({ user: userID });
        candidatedata.voteCount++;
        await candidatedata.save();

        userdata.isvoted = true;
        await userdata.save();

        res.status(200).send({ status: 1,message: "Vote recorded successfully" });
    } catch (error) {
        console.log('Error:',error);
        res.status(500).send({ status: 0,message: "Internal Server Error" });
    }
};


// vote count
const VoteCount = async (req,res) => {
    try {
        const candidatedata = await Candidate.find().sort({ voteCount: -1 });

        const votrecourd = candidatedata.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            }
        });

        return res.status(201).send({ status: 1,message: "ok",data: votrecourd });
    } catch (error) {
        console.log('Error:',error);
        res.status(500).send({ status: 0,message: "Internal Server Error" });
    }
};


//get candidate
const GetCandidate = async (req,res) => {
    try {
        const candidatedata = await Candidate.find({});


        if (candidatedata) {
            return res
                .status(200)
                .json({ status: 1,msg: "Done.",data: candidatedata });
        } else {
            return res.status(200).json({ status: 0,msg: "User Not Found!" });
        }

    } catch (error) {
        console.log('Error:',error);
        res.status(500).send({ status: 0,message: "Internal Server Error" });
    }
}
module.exports = {
    VoteUser,
    VoteCount,
    GetCandidate
};
