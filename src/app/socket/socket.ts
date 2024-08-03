const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('message', (msg) => {
            console.log('Message received:', msg);
            io.emit('message', msg); // Broadcast message to all clients
        });
    });
};

export { setupSocket };
