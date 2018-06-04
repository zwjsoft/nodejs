const fs=require('fs')


/* fs.mkdir("doc",(err)=>{
    if(err) throw err
    fs.readFile('aaa.txt',"utf8",(err,data)=>{
        if(err) throw err
        fs.writeFile('./doc/aaa.txt',data,(err)=>{
            if(err) throw err
        })
    })
})
 */

let Pmkdir=(dirname)=>{
    return new Promise((resolve,reject)=>{
        fs.mkdir(dirname,err=>{
            if(err) reject(err)
            resolve("文件创建成功")
        })
    })

}

let PreadFile=(filename)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filename,"utf8",(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

let PwriteFile=(filename,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(filename,data,(err)=>{
            if(err) reject(err)
            resolve("文件写入成功！")
        })
    })
}

/*  Pmkdir('doc').then(res=>{
     return PreadFile('aaa.txt')
    }
 ).then(res=>{
     return PwriteFile('./doc/aaa.txt',res)
 })
 .catch(err=>console.log(err)) */

 async function fn(){
     await Pmkdir('doc')
     let res =await PreadFile('aaa.txt')
     console.log(res)
     await PwriteFile('./doc/aaa.txt',res)
 }
 fn()

