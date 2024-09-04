const jwt = require("jsonwebtoken");
const CONFIG = require("../configs/config");

const CheckAuthToken = async (req,res,next) => {
    const authHeader = req.headers["authorization"]; // Use lowercase "authorization"

    if (!authHeader || !authHeader.startsWith('bearer')) {
        return res.status(401).send({ status: 0,msg: 'Auth-Token not found.' });
    }


    const token = authHeader.split(' ')[1]; // Extract token part

    try {
        jwt.verify(token,CONFIG.secret_key,(err,decoded) => {
            if (err) {
                return res.status(401).send({ status: 0,msg: 'Auth-Token Expired. Login First.' });
            }

            // Assuming your token contains the user's ID and other info
            req.user = decoded; // Set decoded token info to req.user
            next();
        });

    } catch (error) {
        console.log('Error in token verification:',error);
        res.status(500).send({ status: 0,msg: 'Internal server error' });
    }
}

module.exports = {
    CheckAuthToken
}
