
const chatWs = (expressApp) => {
  const server = require('http').createServer(expressApp)
  const io = require('socket.io')(server)
  let online = 0;
  io.on('connection', socket => {
    console.log("connected")
    online += 1
    setTimeout((5000, () => io.sockets.emit('new-connection', online)))
    socket.on('send-message', message => {
      console.log(message)
      io.sockets.emit('new-message', message)
    })

    socket.on('disconnect', () => {
      online -= 1
      io.sockets.emit('new-connection', online)
      console.log("disconnected")
    })
  
  })

  return server
}


module.exports = chatWs