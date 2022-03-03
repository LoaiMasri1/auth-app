const express = require('express');
const router = express.Router();

router.post('/add', require('../controllers/register').addUser);
router.get('/getusers', require('../controllers/register').getUser);

module.exports = router;
