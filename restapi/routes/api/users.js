const express=require('express')
const router=express.Router()
const User=require('../../models/user')
const crypto = require('crypto');
var gravatar = require('gravatar');
var jwt = require('jsonwebtoken');
const passport=require('passport')
const secret=require('../../config/key').secret
const validateRegisterInput=require('../../validation/register')

router.get('/test',(req,res)=>{
    res.json({
        msg:"success!"
    })
})


//用户注册接口
router.post('/register',(req,res)=>{
    const {errors,isValid}=validateRegisterInput(req.body)
    console.log(errors)
    if(!isValid){
        return res.json({
            success:false,
            msg:errors
        })
    }

    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            res.status(400).json({
                success:false,
                msg:"邮箱重复！"
            })
        }else{
            new User({
                name:req.body.name,
                email:req.body.email,
                password:crypto.createHmac('sha256', secret).update(req.body.password).digest('hex'),
                avatar:gravatar.url('552186866@qq.com', {s: '200', r: 'pg', d: 'mm'})
            }).save().then(user=>{
                res.json({
                    success:true,
                    data:user
                })
            }).catch(err=>{
                res.status(400).json({
                    success:false,
                    msg:err
                })
            })
        }
    })
})

router.post('/login',(req,res)=>{
    const email=req.body.email
    const password=crypto.createHmac('sha256', secret).update(req.body.password).digest('hex')
    User.findOne({email}).then(user=>{
        if(!user){
            res.status(404).json({
                success:false,
                msg:'用户不存在！'}
            )
        }else{
            if(user.password!=password){
                res.status(400).json({
                    success:false,
                    msg:'密码不正确！'}
                )
            }else{
                const rule={
                    id:user.id,
                    name:user.name
                }
                jwt.sign(rule,secret,{ expiresIn: 60 * 60 },(err,token)=>{
                    if(err) throw err
                    res.json({
                        success:true,
                        data:user,
                        token:'Bearer '+token}
                    )
                })
            }
        }
    }).catch(err=>{
        res.status(400).json({
            success:false,
            msg:err
        })
    })
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        success:true,
        data:req.user
    })
})

module.exports=router