var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/health', function (req, res) {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

io.on('connection', (socket) => {
    console.log(`user connected with socket id ${socket.id}`);
    function emitPongMessage() {
        setTimeout(() => {
            socket.emit('testPong', {
                type: 'keep-alive',
                message: 'pong',
                timestamp: new Date().toISOString()
            });
        }, 3000);
    }
    socket.on('testPing', (message) => {
        message.id = socket.id;
        console.log(JSON.stringify(message));
        emitPongMessage();
    });
});

http.listen(PORT, () => {
  console.log(`listening on port, ${PORT}`);
});
