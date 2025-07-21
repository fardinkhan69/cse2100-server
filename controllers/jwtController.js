
require('dotenv').config();
const jwt = require('jsonwebtoken');

const getJwt = async (req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        res.send({ token });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { getJwt };
