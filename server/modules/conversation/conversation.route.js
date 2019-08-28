import BaseRouter from '../base/base.route';
import ConversationController from './conversation.controller';

class ConversationRouter extends BaseRouter {
  constructor(controller) {
    super(controller);

    this.router.get('/:id/replies', this.controller.getReplyMessages);
  }
}

export default new ConversationRouter(ConversationController);
