const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const {ensureAuthenticated} =require('../helpers/auth')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router=express.Router()

require('../models/ideas')
const ideas=mongoose.model('ideas')

router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render("ideas/add")
})

router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
    ideas.findOne({_id:req.params.id}).then(ideas=>{
        res.render("ideas/edit",{ideas:ideas})
    })    
})

router.get('/',ensureAuthenticated,(req,res)=>{
    ideas.find({user:req.user.id}).sort({date:'desc'}).then(ideas=>{    
         res.render("ideas/index",{ideas:ideas})
       
    })
    
})

router.put('/:id',urlencodedParser,(req,res)=>{
    ideas.findOne({_id:req.params.id}).then(ideas=>{
        ideas.title=req.body.title,
        ideas.details=req.body.details,       
        ideas.save().then(()=>{
            req.flash("msg_success","数据修改成功")
            res.redirect('/ideas')
        }
            
        )
    })   
})

router.delete('/:id',urlencodedParser,(req,res)=>{
    ideas.deleteOne({_id:req.params.id}).then(ideas=>{
        req.flash("msg_success","数据删除成功")
        res.redirect('/ideas')
    })  
})

//增加课程记录
router.post('/',urlencodedParser,(req,res)=>{
    var errors=[]
    if(!req.body.title){
        errors.push({text:"标题必须输入！"})
    }
    if(!req.body.details){
        errors.push({text:"详情必须输入！"})
    }
    if(errors.length>0){
        res.render("ideas/add",{errors:errors,title:req.body.title,details:req.body.details})
    }
    else{
        var course={
            title:req.body.title,
            details:req.body.details,
            user:req.user.id
        }
        new ideas(course).save().then(idea=>{
            req.flash("msg_success","数据添加成功")
            res.redirect('/ideas')
        })
    }
   
})

module.exports=router
