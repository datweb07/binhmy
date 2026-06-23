import { io } from 'socket.io-client';

const URL = window.location.origin;
export const socket = io(URL, { transports: ['websocket', 'polling'] });
