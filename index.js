var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('ok')
})

io.on('connection', (socket) => {
  const roomId = String(Math.floor(Math.random() * 10000))
  console.log('connection created:', roomId)

  socket.emit(socket.id, roomId)
  socket.join(roomId)
  socket.on('channel', (data) => {
    const { roomId, ...payload } = data
    io.to(roomId).emit('message', payload)
  })
  socket.on('disconnect', () => {
    console.log(`a user disconnected: room ${roomId}`)
  })
})

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
  console.log('listening on *:3000')
})
