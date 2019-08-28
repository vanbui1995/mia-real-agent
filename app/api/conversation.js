import axios from 'axios';
import { handleError } from './utils';

export const getAllConversation = () => axios
  .get('conversations')
  .then(response => ({ response }))
  .catch(handleError);

export const createConversation = data => axios
  .post('conversations', data)
  .then(response => ({ response }))
  .catch(handleError);

export const getConversation = id => axios
  .get(`conversations/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const getConversationMessage = id => axios
  .get(`conversations/${id}/replies`)
  .then(response => ({ response }))
  .catch(handleError);

export const updateConversation = ({ _id, ...rest }) => axios
  .put(`conversations/${_id}`, rest)
  .then(response => ({ response }))
  .catch(handleError);

export const removeConversation = id => axios
  .delete(`conversations/${id}`)
  .then(response => ({ response }))
  .catch(handleError);
