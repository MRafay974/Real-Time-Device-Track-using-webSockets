const express=require("express")
const path=require("path")
const app=express()
const http=require("http")
const server=http.createServer(app)
const socketio=require("socket.io")

const io=socketio(server)


app.use(express.static(path.resolve("./public")))

app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html")
})


io.on("connection",(user)=>{
    user.on("user-location",(data)=>{
         io.emit("live-location", {id:user.id,...data}
         )
    })
    console.log("connected")

    user.on("disconnect", ()=>{
        io.emit("user-disconnected",user.id)
    })


})





server.listen(9001,()=>{
    console.log("port 9001")
})
