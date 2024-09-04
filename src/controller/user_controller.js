const user = require("../models/user_model");
const commonValidation = require("../validation/common_validation");
const CONFIG = require("../configs/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// register user
const SingUp = async (req,res) => {
    try {
        const data = req.body;
        if (data) {
            if (data.user_email) {
                const email = await commonValidation.isUserExistWithEmail(data.user_email);
                if (!email) {
                    return res.status(200).send({ status: 0,msg: "Email Already Exist!" });
                }
            }

            var password = await bcrypt.hash(data.password,10);

            // User ne pahela create karo
            const users = await user.create({
                name: data.name,
                age: data.age,
                user_email: data.user_email,
                password: password,
                mobile: data.mobile,
                address: data.address,
                aadharCardNumber: data.aadharCardNumber,
                role: data.role,
                created_date: Date.now(),
                updated_date: Date.now(),
            });

            // Pachhi users._id thi token generate karo
            const token = jwt.sign({ id: users._id },CONFIG.secret_key,{ expiresIn: "7d" });

            // `findByIdAndUpdate` function use karo auth_token update karva mate
            await user.findByIdAndUpdate(users._id,{ auth_token: token });

            const userdata = await user.findOne({
                _id: users.id,
                attributes: [
                    "name",
                    "age",
                    "user_email",
                    "password",
                    "mobile",
                    "address",
                    "aadharCardNumber",
                    "role",
                    "auth_token"
                ],
            });

            res.status(201).send({ status: 1,message: "User registered Successfully",userdata: users });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "Internal server error" });
    }
}



//user login
const LogIn = async (req,res) => {
    try {
        const { aadharCardNumber,password } = req.body;

        if (!aadharCardNumber || !password) {
            return res.status(400).send({ status: 0,message: "Please provide aadharCardNumber and password" });
        }

        const data = await user.findOne({ aadharCardNumber: aadharCardNumber });
        if (!data) {
            return res.status(404).send({ status: 0,message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password,data.password);
        if (!isMatch) {
            return res.status(401).send({ status: 0,message: "Invalid password" });
        }

        const token = jwt.sign({ id: data._id },CONFIG.secret_key,{ expiresIn: "7d" });
        await user.updateOne({ auth_token: token },{ where: { _id: data._id } });
        // const expiryDate = new Date(exp * 1000);
        // console.log('Token Expiry Date:',expiryDate);
        // if (Date.now() >= exp * 1000) {
        //     console.log('Token is expired.');
        // } else {
        //     console.log('Token is still valid.');
        // }

        const tokenFromDb = await user.findOne({ where: { auth_token: token } });
        console.log('Token from DB:',tokenFromDb?.auth_token);

        res.status(200).send({ status: 1,message: "Login successfully",token,data: data });

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "Error in login API",error });
    }
}


//user profile fill
const Profile = async (req,res) => {
    var userdata = req.body;
    try {
        // Mongoose ma findOne ne correct tarike use karo
        const maindata = await user.findOne(
            { _id: userdata._id },
            "name age user_email password mobile address aadharCardNumber role user_token auth_token"
        );

        if (maindata) {
            return res
                .status(200)
                .json({ status: 1,msg: "Done.",data: maindata });
        } else {
            return res.status(200).json({ status: 0,msg: "User Not Found!" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 0,message: "Internal server error" });
    }
};



// profile update
const ProfileUpdate = async (req,res) => {
    try {
        const { id } = req.body;

        // Validate ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: 0,message: "Invalid or missing ID" });
        }

        // console.log(`Request ID: ${id}`);

        // Find user by ID
        const data = await user.findById(id);

        // Validation for user existence
        if (!data) {
            return res.status(404).send({ status: 0,message: "User not found" });
        }

        // console.log('User before update:',data);

        // Update fields if present
        const { name,address,mobile,age } = req.body;

        if (name) data.name = name;
        if (address) data.address = address;
        if (mobile) data.mobile = mobile;
        if (age) data.age = age;


        // Save updated user
        await data.save();

        // console.log('User after update:',data);
        res.status(200).send({ status: 1,message: "User Updated Successfully",data: data });

    } catch (error) {
        console.log('Error in update user API:',error);
        res.status(500).send({ status: 0,message: "Error in update user API",error });
    }
};


module.exports = {
    SingUp,
    LogIn,
    Profile,
    ProfileUpdate
}