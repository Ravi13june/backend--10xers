const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth.middleware');
const { getAllUser} = require('../controller/user.controller');

router.get('/', getAllUser);

module.exports = router;
