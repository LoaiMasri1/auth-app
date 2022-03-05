const express = require('express');
const router = express.Router();

router.post('/',require("../controllers/login"));
router.post('/verified',require("../controllers/verified").sendCode);
router.post('/VerifyCode',require("../controllers/verified").verifyEmail);

module.exports=router;