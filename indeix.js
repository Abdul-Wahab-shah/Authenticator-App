const http=require("http")

console.log(http)
const server= http.createServer((res,req)=>{
    req.end("<h1>Noicess<h1/>")
})
server.listen(8000,()=>{
    console.log("Server is Working")

})


