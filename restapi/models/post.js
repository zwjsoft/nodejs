const mongoose=require('mongoose')
const Schema= mongoose.Schema

const PostSchema=new Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"users"
            }
    }
    ],
    comments:[
        {
            date:{
                type:Date,
                default:Date.now
            },
            text:{
                type:String,
                required:true
            },
            user:{
                type:Schema.Types.ObjectId,
                ref:"users"
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports=Post=mongoose.model("post",PostSchema)