import createSocketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import Logger from '../logger';
import AgentQueue from '../modules/queue/agentQueue';
import TicketService from '../modules/ticket/ticket.service';
import { ROLES } from '../../common/enums';
import { register, unregister } from '../modules/chat/chat.socket';
import { createTicketOfflineCronJob } from './cronJob';
import DisconnectQueue from '../modules/queue/disconnectQueue';

const ACTION_MESSAGE = 'ACTION_MESSAGE';
let socketIO;
class SocketIOServer {
  constructor(authenticate) {
    this.authenticate = authenticate;
  }

  connect(server) {
    socketIO = createSocketIO(server, {
      path: '/chat',
    });
    this.socketIO = socketIO;
    this.setUpSocket();
    return socketIO;
  }

  emitActionMessage(action) {
    this.socketIO.emit(ACTION_MESSAGE, action);
  }

  setUpSocket = () => {
    socketIO
      .on('connection',
        socketioJwt.authorize({
          secret: process.env.SECRET_KEY_JWT,
          timeout: 15000, // 15 seconds to send the authentication message
        }))
      .on('authenticated', async (socket) => {
        const { data: user } = await this.authenticate(socket);
        if (!user) {
          // HMR error
          Logger.warning('[Socket.io]: An invalid foul! Disconnecting...');
          socket.disconnect();
          return;
        }
        const { email, role, _id: id } = user;
        const { connected } = socketIO.sockets;
        const { id: socketId } = socket.conn;

        socket.on('disconnect', async () => {
          Logger.info(`[Socket.io]: The foul [${email}] has exit the fray`);
          unregister(id.toString(), socket);
          if (role === ROLES.FREELANCER || role === ROLES.FULLTIME) {
            AgentQueue.remove(user);
          }
          // if user/agent goes offline
          TicketService.handleTicketOffline(user);
          const job = createTicketOfflineCronJob(user);
          job.start();
          console.log(job);
          DisconnectQueue.addJob(job, id);
        });
        connected[socketId] = socket;
        DisconnectQueue.destroyJob(id);
        if (role === ROLES.FREELANCER || role === ROLES.FULLTIME) {
          Logger.info(`[Socket.io]: The Mercenary [${email}] has join the fray`);
          const { _doc } = user;
          AgentQueue.add({ ..._doc, socketId });
          // if agent go online
          TicketService.handleTicketAssigneeOnline(user);
        } else {
          Logger.info(`[Socket.io]: The Foul [${email}] has join the fray`);
          register(id.toString(), socket);
          // if user go online
          TicketService.handleTicketOwnerOnline(user);
        }
      });
  }
}

export const getSocketByUser = (user) => {
  const { socketId } = user;
  const { connected } = socketIO.sockets;
  return connected[socketId];
};

export default SocketIOServer;
