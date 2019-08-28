
import CannedResponseCollection from './canned-response.model';
import BaseService from '../base/base.service';

class CannedResponseService extends BaseService {
  constructor() {
    super(CannedResponseCollection);
  }
}

export default new CannedResponseService();
