const express = require('express')
const router=express.Router();

router.post('/confirmationcode',require("../controllers/forget").confirmCode);
router.get('/',require("../controllers/forget").forgetUser);
router.post('/newpassword',require("../controllers/forget").newPassword);
router.post('/sendcode',require("../controllers/forget").sendCode);

module.exports=router;