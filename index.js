const mqtt = require("mqtt")
const express = require("express")
const http = require('http')
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log('connected web')
})

server.listen(3000, () => {
    console.log('Started server')
})




const client = mqtt.connect("mqtt://broker.hivemq.com")
client.on("connect", () => {
    console.log("Connected to MQTT broker")
    client.subscribe("forero123")
})

client.on("message", (topic, message) => {
    console.log(`Topic: ${topic}, info: ${message.toString()}`)
    
    io.emit('test', message.toString())
})


