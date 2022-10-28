import io from 'socket.io-client';

let socket = null;

export const initSocketConnection = () => {
  socket = io.connect('http://localhost:3001');
};

export const getSocket = () => {
  return socket;
};
