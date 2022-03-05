const express=  require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('./login/logIn')
});
router.get('/signup',(req,res)=>{
    res.render('./register/register')
});

router.get('/forget',(req,res)=>{
    res.render('./forget/forget_password')
});

router.get('/newpassword',(req,res)    => {
    res.render('./forget/insert_password');
});

router.get('/ConfirmationCode',(req,res)    => {
  res.render('./forget/Confirmation_code');
});

router.get('/VerifyEmail',(req,res)    => {
  res.render('send_code2');
})

router.get('/GetCode',(req,res)    => {
  res.render('confirmation_code2');
})

router.get('/SendCode',(req,res)    => {
  res.render('./forget/send_code');
});

module.exports=router;