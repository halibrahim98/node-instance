/*eslint handle-callback-err: "off"*/
let express=require('express')

let app=express()

app.use('/', (req,res,next) => {
    res.statusCode=200
    res.setHeader('Content-Type','text/plain')
    res.end('Hello World')
})

app(8080,'127.0.0.1')