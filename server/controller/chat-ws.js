
const chatWs = (expressApp) => {
  const server = require('http').createServer(expressApp)
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    console.log('Some client connected')
  })

  return server
}


module.exports = chatWs