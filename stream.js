const fs=require('fs')
const http=require('http')

//let myWriteStream=fs.createWriteStream('ccc.txt')



let server=http.createServer((req,res)=>{
    let myReadStream= fs.createReadStream('index.html','utf8')
    if(req.url!='/favicon.ico'){
        console.log(req.url)
        console.log('111111')
        res.writeHead(200,{"Content-type":"text/html"})
        myReadStream.pipe(res)
    }
})

server.listen(8080)

/* myReadStream.on("data",data=>{
    console.log('-----------------')
    myWriteStream.write(data)
}) */