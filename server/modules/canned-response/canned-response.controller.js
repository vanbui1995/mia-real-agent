
import BaseController from '../base/base.controller';
import CannedResponseService from './canned-response.service';

class CannedResponseControll extends BaseController {
  constructor() {
    super(CannedResponseService);
  }
}

export default new CannedResponseControll();
