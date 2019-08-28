import axios from 'axios';
import { handleError } from './utils';

export const list = params => axios //
  .get('admin/canned-responses', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const get = id => axios //
  .get(`admin/canned-responses/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const getListAll = params => axios //
  .get('canned-responses', { params })
  .then(response => ({ response }))
  .catch(handleError);


export const update = (id, data) => axios //
  .put(`admin/canned-responses/${id}`, data)
  .then(response => ({ response }))
  .catch(handleError);
export const insert = data => axios //
  .post('admin/canned-responses/', data)
  .then(response => ({ response }))
  .catch(handleError);

export const remove = id => axios //
  .delete(`admin/canned-responses/${id}`)
  .then(response => ({ response }))
  .catch(handleError);
