const fs=require('fs')


// fs.readFile('aaa.txt','utf8',(err,data)=>{
//     console.log(data)
// })
/* 
fs.readFile(Buffer.from('aaa.txt'),'utf8',(err,data)=>{
    console.log(data)
})

//new URL('file:///tmp/hello')
fs.readFile(new URL('file:///E:/kf/nodejs/aaa.txt'),'utf8',(err,data)=>{
    console.log(data)
}) */

/* let fsWatch=fs.watch('./', { encoding: 'utf8' }, (eventType, filename) => {
    if (filename) {
      console.log(filename);
      // 打印: <Buffer ...>
    }
  });
fsWatch.on('change',()=>{
    console.log("======")
}) */

let readStream=fs.createReadStream('aaa.txt')
readStream.pause() 

var content = '';

readStream.setEncoding('utf8');

let a=readStream.read(1)
readStream.pipe(process.stdout)

let i=0
readStream.on('data', function(chunk){
    console.log(i++)
    content += chunk;
});

readStream.on('end', function(chunk){
    // 文件读取完成，文件内容是 [你好，我是程序猿小卡]
    console.log('文件读取完成，文件内容是 [%s]', content);
});


