class SocketChannel {

    // ==========================
    // SEND
    // ==========================
  
    async send({
  
      io,
  
      event,
  
      room,
  
      data
  
    }) {
  
      try {
  
        if (!io) {
  
          console.log(
            'SOCKET IO NOT FOUND'
          );
  
          return;
  
        }
  
        // ======================
        // ROOM EVENT
        // ======================
  
        if (room) {
  
          io.to(room).emit(
  
            event,
  
            data
  
          );
  
        }
  
        // ======================
        // GLOBAL EVENT
        // ======================
  
        else {
  
          io.emit(
  
            event,
  
            data
  
          );
  
        }
  
        console.log(
  
          `SOCKET EVENT SENT: ${event}`
  
        );
  
      }
  
      catch (error) {
  
        console.log(error);
  
      }
  
    }
  
  }
  
  module.exports =
    new SocketChannel();