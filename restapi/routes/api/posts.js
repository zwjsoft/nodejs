const express=require('express')
const router=express.Router()
const Post=require('../../models/post')
const Profile=require('../../models/profile')
const passport=require('passport')


// $router  POST api/posts/
// @desc    添加评论
// @access  private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    new Post({
        text:req.body.text,
        user:req.user.id
    }).save().then((post)=>{
        res.json(post)
    }).catch(err=>{
        res.status(400).json(post)
    })
})

// $router  GET api/posts/
// @desc    获取评论
// @access  private
router.get('/',(req,res)=>{
    Post.find().sort({date:-1}).then(posts=>{
        res.json(posts)
    }).catch(err=>{
        res.json(err)
    })
})

// $router  GET api/posts/:id
// @desc    获取评论
// @access  private
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id).then(post=>{
        res.json(post)
    }).catch(err=>{
        res.json(err)
    })
})

// $router  DELETE api/posts/:id
// @desc    删除单条评论
// @access  private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findById(req.user.id).then(profile=>{
        Post.findById(req.params.id).then(post=>{
            if(req.user.id==post.user){
                post.remove().then(()=>{
                    res.json({
                        success:true,
                        msg:"删除成功！"
                    })
                })
            }else{
                res.json({
                    success:false,
                    msg:"非法操作！"
                })
            }
        })
    })
})

// $router  POST api/posts/like/:id
// @desc     点赞评论
// @access  private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findById(req.user.id).then(profile=>{
        Post.findById(req.params.id).then(post=>{            
            if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                return res.json({
                    success:false,
                    msg:"已点赞，不能重复！"
                })
            }
            post.likes.unshift({user:req.user.id});
            post.save().then(post=>{
                res.json(post)
            })
        })
    })
})

// $router  POST api/posts/unlike/:id
// @desc     取消点赞评论
// @access  private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findById(req.user.id).then(profile=>{
        Post.findById(req.params.id).then(post=>{            
            if(post.likes.filter(like=>like.user.toString()===req.user.id).length==0){
                return res.json({
                    success:false,
                    msg:"未点赞，不能取消！"
                })
            }
            const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
            console.log(removeIndex)
            post.likes.splice(removeIndex,1);
            post.save().then(post=>{
                res.json(post)
            })
        })
    })
})

// $router  POST api/posts/comment/:id
// @desc     添加评论
// @access  private
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        Post.findById(req.params.id).then(post=>{            
            post.comments.unshift({
                text:req.body.text,
                user:req.user.id
            });
            post.save().then(post=>{
                res.json(post)
            })
        })
    })

// $router  DELETE api/posts/comment/:id/:comment_id
// @desc     删除评论
// @access  private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.findById(req.params.id).then(post=>{            
        post.comments=post.comments.filter(comment=>comment.id!=req.params.comment_id)
        post.save().then(post=>{
            res.json(post)
        })
    })
})

module.exports=router