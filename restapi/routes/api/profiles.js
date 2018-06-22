const express=require('express')
const router=express.Router()
const Profile=require('../../models/profile')
const passport=require('passport')
const isEmpty=require('../../validation/isEmpty')
const validateProfileInput=require('../../validation/profile')

//简历新增接口
router.post('/add',(req,res)=>{

})

//获取当前用户信息
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors={}
    Profile.findOne({user:req.user.id}).populate("user",["name","email"]).then(profile=>{
        if(!profile){
            errors.noProfile="无此用户简历信息！"
        }
        if(!isEmpty(errors)) return res.status(404).json(errors)
        res.json(profile)
    }).catch(err=>res.json(err))
})

// $router  GET api/profile/handle/:handle
// @desc    通过handle获取个人信息
// @access  public
router.get('/handle/:handle',(req,res)=>{
    Profile.findOne({handle:req.params.handle}).populate("user",['name','email']).then(profile=>{
        if(!profile){
            return res.status(404).json({
                nohandle:"未找到对应的handle！"
            })
        }
        res.json(profile)
    })
})

// $router  GET api/profile/all
// @desc    获取所有个人信息
// @access  public
router.get('/all',(req,res)=>{
    Profile.find().populate("user",['name','email']).then(profiles=>{
        if(!profiles){
            return res.status(404).json({
                noprofile:"未找到profile！"
            })
        }
        res.json(profiles)
    })
})

//编辑当前用户信息
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}= validateProfileInput(req.body)
    if(!isValid){
        return res.json(errors)
    }
    let profileInfo={
        user:req.user.id,
        handle:req.body.handle,
        company:req.body.company,
        website:req.body.website,
        location:req.body.location,
        status:req.body.status,
        bio:req.body.bio,
        githubusername:req.body.githubusername    
    }    
    if(typeof req.body.skills!=="undefined"){
       profileInfo.skills=req.body.skills.split(",")     
    }
    profileInfo.social={}
    profileInfo.social.wechat=req.body.wechat
    profileInfo.social.QQ=req.body.QQ
    profileInfo.social.wangyikt=req.body.wangyikt
    profileInfo.social.tengxunkt=req.body.tengxunkt    

    Profile.findOne({user:req.user.id}).then(profile=>{
        if(profile){
            Profile.findOneAndUpdate({user:req.user.id},{$set:profileInfo},{new:true}).then(profile=>{
                res.json(profile)
            })
        }else{
            //判断handle是否重复
            Profile.findOne({handle:req.body.handle}).then(profile=>{
                if(profile){
                    res.json({
                        msg:"用户handle已存在！"
                    })
                }else{
                    new Profile(profileInfo).save().then(profile=>{
                        res.json(profile)
                    })
                }
            })

        }
    })

})

// $router  GET api/profile/experience
// @desc    添加个人经历
// @access  public
router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        profile.experience.unshift({
            current:req.body.current,
            title:req.body.title, 
            company:req.body.company, 
            location:req.body.location, 
            from:req.body.from, 
            to:req.body.to, 
            description:req.body.description
        })
        profile.save().then(profile=>{
            res.json(profile)
        })
    })
})

// $router  DELETE api/profile/experience/:id
// @desc    添加个人经历
// @access  public
router.delete('/experience/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        let removeindex=profile.experience.map(item=>item.id).indexOf(req.params.id)
        profile.experience.splice(removeindex)
        profile.save().then(profile=>{
            res.json(profile)
        })
    })
})

// $router  DELETE api/profile
// @desc    删除个人信息
// @access  private
router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        if(profile){
            profile.remove((err)=>{
                if(err)
                res.json(err)
                else
                res.json({
                    success:true
                })
            })
        }
    })
})


module.exports=router