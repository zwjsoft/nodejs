module.exports={
    ensureAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }else{
            req.flash("msg_error","请先登录后再访问！")
            res.redirect('/user/login')
        }
    }
}