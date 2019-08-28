import express from 'express';
/* routers */
import UserRouter from './user/user.route';
import AuthRouter from './auth/auth.route';
import TicketRouter from './ticket/ticket.route';
import ApplicationRouter from './application/application.route';
import AgentRouter from './agent/agent.route';
import ConversationRouter from './conversation/conversation.route';
import AdminRouter from './admin/routers';
import ReplyRouter from './reply/reply.route';
import IntentRouter from './intent/intent.route';
import ResponseRouter from './intentResponse/intentResponse.route';
import CannedResponseRouter from './canned-response/canned-response.route';


const router = express.Router();

export default () => {
  router.use('/users', UserRouter.router);
  router.use('/auth', AuthRouter.router);
  router.use('/tickets', TicketRouter.router);
  router.use('/applications', ApplicationRouter.router);
  router.use('/agents', AgentRouter.router);
  router.use('/conversations', ConversationRouter.router);
  router.use('/admin', AdminRouter.router);
  router.use('/reply', ReplyRouter.router);
  router.use('/intents', IntentRouter.router);
  router.use('/responses', ResponseRouter.router);
  router.use('/canned-responses', CannedResponseRouter.router);
  return router;
};
