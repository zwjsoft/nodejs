const mongoose=require('mongoose')
const Schema=mongoose.Schema
const UserSchema=new Schema({
    name:{type:String},
    password:{type:String},
    email:{type:String},
    date:{type:String,default:Date.now}
})

module.exports=User=mongoose.model('user',UserSchema)