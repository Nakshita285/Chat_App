// express -> framework of code of node js for creating the server
// nodemon -> dependency  of node js that used only in the development
// socket.io -> helps in socket communication

const express =require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const http = require('http');
const {Server} = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

// app.get('/', function(request,response) {
//     console.log("Get worked");

// })
// used for showing the online list of users
let userList = [];

io.on("connection", function(socket){
    // console.log("Socket Connected: ");

    socket.on("userConnect", function(userName){
        let userObj = {id : socket.id, name: userName};
        userList.push(userObj);
        console.log(userList);

        // self list -> for online users
        socket.emit("online-list", userList);
        socket.emit("join", userObj);
        // broadcast the message to other userws
        socket.broadcast.emit("join", userObj);

    })

    socket.on("chat", function(chatObj){
        socket.broadcast.emit("chatLeft", chatObj);
    })

    socket.on("disconnect", function(){
        // chat window -> message show left user
        // list delete -> user
        let leftUserObj;
        let remainingUsers = userList.filter(function(userObj){
            if(userObj.id == socket.id){
                leftUserObj = userObj;
                return false;
            }
            return true;
        })
        userList = remainingUsers;
        // console.log(leftUserName);
        socket.broadcast.emit('leave', leftUserObj);
    })
})

let PORT = process.env.PORT || 3000;
server.listen(PORT, function(){
    console.log("Sever Connected");
})
