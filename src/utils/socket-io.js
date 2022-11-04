import io from 'socket.io-client';
import { APIDomain } from '../constants/constants';

let socket = null;

export const initSocketConnection = () => {
  socket = io.connect(`http://${APIDomain}`);
};

export const getSocket = () => {
  return socket;
};
