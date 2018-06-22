const validator = require('validator');
const isEmpty=require('./isEmpty')

module.exports=function validateProfileInput(data){
    let errors={}
    //将空转为validator识别的字符串
    if(isEmpty(data.handle)) data.handle=''
    if(isEmpty(data.website)) data.website=''
    if(isEmpty(data.skills)) data.skills=''

    if(!validator.isLength(data.handle,{min:6,max:20})){
        errors.handle="用户长度6-20！"
    }

    if(!isEmpty(data.website)){
       if(!validator.isURL(data.website)){
           errors.website="website地址不合法！"
       }
    }

    if(validator.isEmpty(data.skills)){
        errors.skills="skills不能为空！"
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}