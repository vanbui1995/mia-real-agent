import axios from 'axios';
import { handleError } from './utils';

export const sendReplyMessage = (from, to, conversationId, messages) => axios
  .post('/reply', {
    from, to, conversationId, messages,
  })
  .then(response => ({ response }))
  .catch(handleError);
