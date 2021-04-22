
const chatWs = (expressApp) => {
  const server = require('http').createServer(expressApp)
  const io = require('socket.io')(server)
  io.of('/chat').on('connection', socket => {
    console.log('Some client connected')

    socket.on('send-message', message => {
      socket.emit('new-message', message)
    })
    socket.on('disconnect', () => {
      console.log("disconnected")
    })
  
  })

  return server
}


module.exports = chatWs