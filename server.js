const http=require('http')

const hostname='127.0.0.1'
const port=8080

const server=http.createServer((req,res)=>{
    res.setHeader("Content-type","text/pain")
    res.end('ok')
})

server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}`)
})