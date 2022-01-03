const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users')


const publicPath = path.join(__dirname + '../../public')
const port = process.env.PORT || 3000 || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)
let users = new Users();


// app.use(express.Secret());
// app.use(express.session({userId: socket.id}))
app.use(express.static(publicPath))



io.on('connection', (socket) => {
  console.log('Nouveau user connection');
  
  
  ///////////////////////////////////////////////
  // disconnecting emails
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newExitMessage', generateMessage('Admin', `${user.name} has left the chat room.`));
    }
    
    
    
    console.log('you dont have connection')
  })

  
  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
  // socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined'));
  
  
  
  
  /////////////////////////////////////////////////
  socket.on('join', (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required')
    }
    
    // sessionId = sessionId(socket.id)

    

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room)
    
    
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to my chatApp'))
    socket.broadcast.to(params.room).emit('newAlertMessage', generateMessage('Admin', `${params.name} has joined the chat room.`));
    callback()
  })
  
  
  ///////////////////////////////////////////////////
  socket.on('createMessage', (mes, callback) => {
    var user = users.getUser(socket.id);
    // console.log(sessionId)
    console.log(socket.id)
    if (user.id === user.id){
      // console.log('its the same')
    }

    if(user && isRealString(mes.text)){
      // io.to(user.room).emit('newMessage', generateMessage(user.name, mes.text, ));
      socket.broadcast.to(user.room).emit('newMessage', generateMessage(user.name, mes.text, ));
      socket.emit('myMessage', generateMessage(user.name, mes.text, ))
      // io.to(user.room).emit('newMessage', generateMessage(user.name, mes.text, ));
    }
    // console.log('ton nuevo mensaje', mes)
      callback();
  })


  ///////////////////////////////////////////////////
  socket.on('createLocationMessage', (coords)=>{
    var user = users.getUser(socket.id);
    // console.log('this is it')
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

})



server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
