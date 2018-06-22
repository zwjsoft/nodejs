const validator = require('validator');
const isEmpty=require('./isEmpty')

module.exports=function validateRegisterInput(data){
    let errors={}
    if(!validator.isLength(data.name,{min:6,max:20})){
        errors.name="用户长度6-20！"
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}