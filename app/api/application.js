import axios from 'axios';
import { handleError } from './utils';

export const createApplication = data => axios
  .post('applications', data)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const adminGetAllApplication = params => axios
  .get('admin/applications', { params })
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const approveApplication = id => axios
  .post(`applications/${id}/approve`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const rejectApplication = id => axios
  .post(`applications/${id}/reject`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const reviewApplication = id => axios
  .post(`applications/${id}/review`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const get = id => axios
  .get(`admin/applications/${id}`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const getApplicationSummary = () => axios
  .get('admin/applications/dashboard/summary')
  .then(response => ({ response }))
  .catch(error => handleError(error));
