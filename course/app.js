const express=require('express')
const exphbs  = require('express-handlebars');
const mongoose=require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash');
const passport=require('passport')
const ideas=require('./router/ideas')
const user=require('./router/user')

const app=express()
const port=process.env.port || 8080

app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const db=require('./config/database')
mongoose.connect(db.mongoUrl).then(()=>{
    console.log('mongodb is connected!')
}).catch(err=>{
    console.log(err)
})

require('./config/passport')(passport)

app.use(express.static('./public'))

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true

  }))
app.use(passport.initialize());
app.use(passport.session());


app.use(flash())

//全局变量
app.use((req,res,next)=>{
    res.locals.msg_success=req.flash("msg_success")
    res.locals.msg_error=req.flash("msg_error")
    res.locals.error=req.flash("error")
    //console.log(req.user)
    res.locals.user=req.user || null
    next()
})

app.get('/',(req,res)=>{
    res.render("index",{
        title:"课程管理系统"
    })
})

app.get('/about',(req,res)=>{
    res.render("about")
})

app.use('/ideas',ideas)
app.use('/user',user)

app.listen(port,()=>{
    console.log("The server is running ...")
})