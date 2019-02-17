const validator = require('validator')
const _ = require('lodash')
module.exports=(data)=>{
    const errors={}
    if(!validator.isLength(data.name,{min:6, max: 20})){
        errors.name='用户名的长度必须在6-20！'
    }
    return {
        errors,
        isValid:_.isEmpty(errors)
    }
}