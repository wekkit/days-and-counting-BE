var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  const roomId = String(Math.floor(Math.random() * 10000))
  console.log('connection created:', roomId)

  socket.emit(socket.id, roomId)
  socket.join(roomId)
  socket.on('channel', ({ idVal, channel }) => {
    io.to(idVal).emit('message', { channel })
  })
  socket.on('disconnect', () => {
    console.log(`a user disconnected: room ${roomId}`)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
