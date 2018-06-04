const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const passport=require('passport')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const router=express.Router()

require('../models/user')
const user=mongoose.model('user')

router.get('/login',(req,res)=>{
    res.render("user/login")
})


router.get('/register',(req,res)=>{
    res.render("user/register")
})

router.post('/login',urlencodedParser,(req,res,next)=>{
    passport.authenticate('local', { 
        failureRedirect: '/user/login',
        successRedirect:'/ideas',
        failureFlash:true
     })(req,res,next)  
})

router.get('/logout',(req,res)=>{
    req.logout()
    req.flash("msg_success","退出登录成功！")
    res.redirect('/user/login')

})

router.post('/register',urlencodedParser,(req,res)=>{
    let errors=[]
    if(req.body.password!=req.body.password2){
        errors.push({text:"两次密码不一致！"})
    }
    if(req.body.password.length<4){
        errors.push({text:"密码位数大于等于4"})
    }
    if(!req.body.email){
        errors.push({text:"用户邮箱必填！"})
    }

    if(errors.length>0){
        res.render("user/register",{
            errors:errors,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password}
        )
    }else{
        user.findOne({email:req.body.email}).then(data=>{
            if(data){
                req.flash('msg_error',"该邮箱已注册！")
                res.redirect('/user/register')
            
            }else{
                new user({
                    name:req.body.name,
                    email:req.body.email,
                    password: crypto.createHmac('sha256', req.body.email).update(req.body.password).digest('hex')
                }).save().then((data)=>{
                    req.flash('msg_success',"用户注册成功！")
                    res.redirect('/user/login')
                }).catch(err=>{
                    req.flash('msg_error',err)
                    res.redirect('/user/register')
                })
            }
        })  //注意此处是异步执行

        
        
    }
    
})
module.exports=router