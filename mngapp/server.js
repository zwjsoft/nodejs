const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const passport=require('passport')

const app=express()

const port=process.env.PORT || 3000
mongoose.connect(require('./config/keys').mongodbURI).then(()=>{
    console.log('mongodb is connected!')
})


app.use(passport.initialize())
require('./config/passport')(passport)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('welcome!')
})

const users=require('./routes/api/user')
app.use('/user',users)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})