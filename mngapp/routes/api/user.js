const express=require('express')
const router=express.Router()
const User=require('../../models/User')
const crypto = require('crypto')
const passwordSecret=require('../../config/keys').passwordSecret
const tokenSecret=require('../../config/keys').tokenSecret
const jwt = require('jsonwebtoken');
const passport=require('passport')

router.get('/current',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    res.json(req.user)
})

router.post('/login',(req,res)=>{
    let body=req.body
    if(!body.name || !body.password){
        res.json({
            success:false,
            msg:'用户、密码或邮箱不能为空！'
        })
    return
    }
    const pws=crypto.createHmac('sha256', passwordSecret).update(body.password).digest('hex')
    User.findOne({"name":body.name,"password":pws}).then(data=>{
        if(data){
            const rule={id:data._id,name:data.name}
            jwt.sign(rule, tokenSecret, {expiresIn:3600},(err,token)=>{
                if(err) throw err
                res.json({
                    success:true,
                    token:'Bearer ' + token
                })
            });

        }else{
            res.json({
                success:false,
                msg:'无此用户或密码不匹配！'
            })
        }
}).catch(err=>{
    throw err
})
})
router.post('/register',(req,res)=>{
    let body=req.body
    let {errors,isValid}=require('../../validation/userValidator')(body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    if(!body.name || !body.password || !body.email){
        res.json({
            success:false,
            msg:'用户、密码或邮箱不能为空！'
        })
    return
    }

   User.findOne({$or:[{"name":body.name},{"email":body.email}]}).then(data=>{
    if(data){
        res.json({
            success:false,
            msg:'该用户和邮箱已被注册！'
        })
        return
    }else{   
        const pws=crypto.createHmac('sha256', passwordSecret).update(body.password).digest('hex')
        const user=new User({
            name:body.name,
            password:pws,
            email:body.email
        })
        user.save((err,data)=>{
            if(err) throw err
            res.json({
                success:true,
                msg:'',
                data:data
            })
        })
    }
   }).catch(err=>{
    throw err
   })
})


module.exports=router