var http = require('http').createServer();
var io = require('socket.io')(http);
var port = 4000;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('update', '[ Welcome to ReactJS ChatRoom ]');
    socket.on('message', (msg) => {
        io.sockets.emit('update', '# ' + msg);
    });
});

http.listen(port, () => {
    console.log('listening on port ' + port);
});
