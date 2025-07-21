const express = require('express');
const { getJwt } = require('../controllers/jwtController');

const router = express.Router()

router.post('/jwt', getJwt);

module.exports = router;