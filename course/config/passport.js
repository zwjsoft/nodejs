
const crypto = require('crypto');
const mongoose=require('mongoose')
const LocalStrategy=require('passport-local')
const User=mongoose.model('user')

module.exports=(passport)=>{
    passport.use(new LocalStrategy(
        {usernameField: 'email'},(email,password,done)=>{
            //console.log(email,password)
            User.findOne({email}).then(data=>{
                if(!data){
                    return done(null,false,{message:'没有这个用户！'})      
                }else{
                    let pwd=crypto.createHmac('sha256', email).update(password).digest('hex')
                    if(!(data.password== pwd)){
                        return done(null,false,{message:'用户密码不正确！'})  
                    }else{
                        return done(null,data)
                    }
                }
            }) 
            }
      ));

      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
       
      passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
}