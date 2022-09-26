const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes")
const app = express()
const server = require("http").createServer(app)
const { Server } = require("socket.io")

// parsing application/json & application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use("/", routes)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
	console.log("socket connected")

  socket.on("SEND_MESSAGE", (data) => {
    socket.broadcast.emit(`RECEIVE_MESSAGE_${data.roomCode}`, data)
  })
})

module.exports = { server, io }
