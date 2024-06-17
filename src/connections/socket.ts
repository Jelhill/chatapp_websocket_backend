import { Server } from 'socket.io';
import Message from '../models/message';
import { Events } from '../config/constants';
import { properties } from '../config/properties';

const socketConnection = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: properties.FRONTEND_BASE_URL,  // Replace with your React app's URL
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
  });

  io.on(Events.CONNECTION, (socket) => {
    console.log('A user connected');

    (async () => {
      try {
        const messages = await Message.find().sort({ timestamp: 1 }).exec();
        socket.emit(Events.PREVIOUS_MESSAGES, messages);
      } catch (err) {
        console.error(err);
      }
    })();

    socket.on(Events.CHAT_MESSAGE, async (msg: any) => {
      const newMessage = new Message(msg);
      try {
        await newMessage.save();
        io.emit(Events.CHAT_MESSAGE, msg);
      } catch (err) {
        console.error('Error saving message to database:', err);
      }
    });

    socket.on(Events.DISCONNECT, () => {
      console.log('User disconnected');
    });
  });

  return io;
};

export default socketConnection;
