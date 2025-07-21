const Doctor = require('../models/DoctorsModel');

const verifyAdmin = async (req, res, next) => {
    try {
        // Check if token was decoded by verifyToken middleware
        if (!req.decoded || !req.decoded.email) {
            return res.status(401).send({ message: 'unauthorized access - no decoded token' });
        }

        const email = req.decoded.email;
        const query = { email: email };
        const doctor = await Doctor.findOne(query);
        
        if (!doctor) {
            return res.status(403).send({ message: 'forbidden access - not a registered doctor' });
        }
        
        next();
    } catch (error) {
        console.error('Error in verifyAdmin middleware:', error);
        return res.status(500).send({ message: 'internal server error' });
    }
}

module.exports = verifyAdmin;