const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const passport=require('passport')

const users=require('./routes/api/users')
const profiles=require('./routes/api/profiles')
const posts=require('./routes/api/posts')

const port=process.env.port || 8080

const mongoURI=require('./config/key').mongoURI
mongoose.connect("mongodb://localhost/restapi").then(()=>{
    console.log('mongodb is connected!')
}).catch(err=>{
    console.log('mongodb error:'+err)
})


const app=express()

//允许跨域
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type")
    res.header("Access-Control-Allow-Methods","PUT,POST,DELETE,GET,OPTIONS")
    next()
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//passport配置
app.use(passport.initialize());
require('./config/passport')(passport)

app.get("/",(req,res)=>{
    res.send("OK")
})

//user路由
app.use('/api/users',users)

//profile路由
app.use('/api/profiles',profiles)

//posts
app.use('/api/posts',posts)

app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})