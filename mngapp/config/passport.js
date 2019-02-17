const User=require('../models/User')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('./keys').tokenSecret;
module.exports=(passport)=>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload)
        User.findOne({_id: jwt_payload.id}).then(user=>{
            if(user) done(null,user)
            else done(null,false)
        }).catch(err=>{
            done(err,false)
        })
    }));
}