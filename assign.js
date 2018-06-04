var a={
    name:"111",
    age:10,
    education:{
        e1:"001",
        e2:"002"
    }
}

var b={}
Object.assign(b,a)
a.name="2222"
a.education.e1="003"
console.log(b)
console.log(a)