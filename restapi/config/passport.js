var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/user')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('./key').secret;



module.exports=passport=>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        User.findById(jwt_payload.id).then(user=>{
            if(user){
                return done(null,user)
            }else{
                return done(null,false)
            }
        }).catch(err=>{
            console.log(err)
        })

    }));
}