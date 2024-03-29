const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes")
const messageRoute = require("./Routes/messagesRoute")
const socket = require("socket.io")

const app = express();
dotenv.config()


app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/message", messageRoute)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connection established");
}).catch(err => {console.log(err.message)});

app.get('/', (req, res) => res.send('Hello Server!'))
const server =  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});



const io = socket(server,{
    cors:{
        origin: "https://chattverse.netlify.app",
        credentials: true
    }
})


global.onlineUsers = new Map()

io.on("connection" , (socket)=>{
    global.chatSoket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id);
    })
    
    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    })
})