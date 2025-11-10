export const setupWebSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinProject', (projectId) => {
      socket.join(`project_${projectId}`);
    });

    socket.on('taskUpdated', (data) => {
      // broadcast to project room
      io.to(`project_${data.projectId}`).emit('taskUpdated', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
};
