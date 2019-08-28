import BaseRouter from '../base/base.route';
import CannedResponseController from './canned-response.controller';

class CannedResponseRouter extends BaseRouter {
  constructor() {
    super(CannedResponseController);
  }
}

export default new CannedResponseRouter();
