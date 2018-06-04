const http=require("http")
const express=require("express")
const util=require('util')

const app=express()
app.set('view engine','ejs')
app.use('/static',express.static('static'))
console.log(express.static('static'))

app.get('/',(req,res)=>{
    //res.send('This is home page!')
    res.render('index')
})

app.get('/user',(req,res)=>{
    let data=[
        {name:'zwj',age:30},
        {name:'zyh',age:12}
    ]
    res.render('user',{data:data})
})

app.listen(8080)

app.on('connection', (stream) => {
    console.log('someone connected!');
  });
  console.log(util.inspect(app.listeners('connection')));