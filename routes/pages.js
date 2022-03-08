const express=  require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('./login/logIn')
});
router.get('/signup',(req,res)=>{
    res.render('./register/register')
});

router.get('/forget',(req,res)=>{
    res.render('./forget/forgetPassword')
});

router.get('/newpassword',(req,res)    => {
    res.render('./forget/insertPassword');
});

router.get('/ConfirmationCode',(req,res)    => {
  res.render('./forget/confirmationCode');
});

router.get('/VerifyEmail',(req,res)    => {
  res.render('sendCode2');
})

router.get('/GetCode',(req,res)    => {
  res.render('confirmationCode2');
})

router.get('/SendCode',(req,res)    => {
  res.render('./forget/sendCode');
});

module.exports=router;