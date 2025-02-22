import axios from 'axios';
import { handleError } from './utils';

export const getUserProfile = id => axios
  .get(`users/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const updateUserProfile = (id, data) => axios
  .put(`users/${id}`, { data })
  .then(response => ({ response }))
  .catch(handleError);

export const addAddress = data => axios
  .post('users/address', { data })
  .then(response => ({ response }))
  .catch(handleError);

export const setDefaultAddress = data => axios
  .put('users/address/set-default', { data })
  .then(response => ({ response }))
  .catch(handleError);

export const editAddress = data => axios
  .put('users/address/edit', { data })
  .then(response => ({ response }))
  .catch(handleError);

export const deleteAddress = index => axios
  .delete(`users/address/${index}`)
  .then(response => ({ response }))
  .catch(handleError);

export const checkPassword = (userId, password) => axios
  .post('users/checkPassword', {
    userId, password,
  })
  .then(response => ({ response }))
  .catch(handleError);

export const changePassword = (userId, oldPassword, newPassword) => axios
  .post(`users/${userId}/changePassword`, {
    oldPassword,
    newPassword,
  })
  .then(response => ({ response }))
  .catch(handleError);

export const findAvailableAgent = ticketId => axios
  .post('agents/search', {
    ticketId,
  })
  .then(response => ({ response }))
  .catch(handleError);

export const list = params => axios
  .get('admin/users/', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const get = id => axios
  .get(`admin/users/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const update = (id, data) => axios
  .put(`admin/users/${id}`, { data })
  .then(response => ({ response }))
  .catch(handleError);
export const insert = data => axios
  .post('admin/users/', { data })
  .then(response => ({ response }))
  .catch(handleError);

export const remove = id => axios
  .delete(`admin/users/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const getUserSummary = () => axios
  .get('admin/users/dashboard/summary')
  .then(response => ({ response }))
  .catch(handleError);

export const sendMail = ticketId => axios
  .post('users/mail', {
    ticketId,
  });

export const getUploadSignedUrl = data => axios
  .get('/users/upload', data)
  .then(response => ({ response }))
  .catch(handleError);
