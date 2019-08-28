import {
  call, put, take, takeEvery, select,
} from 'redux-saga/effects';
// import { push } from 'connected-react-router';
import { notification } from 'antd';
// lodash
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import _assign from 'lodash/assign';

// utils
import { getSkipLimit } from 'utils/func-utils';

// selector
import {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/cannedResponse';
// actions
import {
  CANNED_RESPONSE_FETCH_LIST,
  CANNED_RESPONSE_SORTING,
  CANNED_RESPONSE_ADD_NEW,
  CANNED_RESPONSE_CHANGE_PAGE,
  CANNED_RESPONSE_FETCH_SINGLE,
  CANNED_RESPONSE_UPDATE,
  CANNED_RESPONSE_REMOVE,
  CANNED_RESPONSE_FETCH_BY_USER,
  actions as cannedResponseActions,
} from 'reducers/cannedResponse';
import * as CannedReponseAPI from 'api/cannedResponse';


function* queryCannedRespones(action) {
  const cannedResponsePayload = {};
  const { type } = action;
  switch (type) {
    case CANNED_RESPONSE_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(cannedResponsePayload, { sort: { [field]: order } });
      }
      break;
    case CANNED_RESPONSE_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(cannedResponsePayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(cannedResponseActions.fetchListCannedResponse(cannedResponsePayload));
}

function* fetchList({ payload }) {
  const selectedPage = yield select(getSelectedPage);
  const sizePerPage = yield select(getSizePerPage);
  const { skip, limit } = getSkipLimit(selectedPage, sizePerPage);

  const actionParam = _pickBy(
    _pick(payload, ['skip', 'limit', 'sort']),
    v => v !== null && v !== undefined,
  );
  const sorting = yield select(reselectSorting);
  const { field, order } = sorting;
  const sort = { [field]: order };

  const params = {
    sort,
    skip,
    limit,
    ...actionParam,
  };

  const result = yield call(CannedReponseAPI.list, params);
  const response = _get(result, 'response', {});
  const error = _get(result, 'error');
  const data = _get(response, 'data.result', []);
  const totalCount = _get(response, 'data.totalRecord', 0);
  if (error || response.status !== 200) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(cannedResponseActions.fetchListCannedResponseFail(errMsg));
  } else {
    yield put(cannedResponseActions.fetchListCannedResponseSuccess(data, totalCount));
  }
}

function* addNewCannedResponse({ payload }) {
  const cannedResponseResult = yield call(CannedReponseAPI.insert, payload);
  const response = _get(cannedResponseResult, 'response', {});
  const error = _get(cannedResponseResult, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(cannedResponseActions.addNewCannedResponseFail(errMsg));
    notification.error({ message: errMsg });
  } else {
    // const { _id } = data;
    yield put(cannedResponseActions.addNewCannedResponseSuccess(data));
    notification.success({ message: 'New canned response has been added' });
    // yield put(push(`admin/user/${_id}`));
  }
}

function* cannedResponseFetchSingle({ id }) {
  const cannedResponseResult = yield call(CannedReponseAPI.get, id);
  const response = _get(cannedResponseResult, 'response', {});
  const error = _get(cannedResponseResult, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(cannedResponseActions.fetchCannedResponseSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(cannedResponseActions.fetchCannedResponseSingleSuccess(data));
  }
}

function* cannedResponseUpdate({ payload }) {
  const { _id: id } = payload;
  const cannedResponseResult = yield call(CannedReponseAPI.update, id, payload);
  const response = _get(cannedResponseResult, 'response', {});
  const error = _get(cannedResponseResult, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(cannedResponseActions.updateCannedResponseFail(errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(cannedResponseActions.updateCannedResponseSuccess(data));
    notification.success({ message: 'Canned response update success' });
    // yield put(push(`/user/${id}`));
  }
}

function* cannedResponseRemove({ cannedResponseId }) {
  const { response, error } = yield call(CannedReponseAPI.remove, cannedResponseId);
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(cannedResponseActions.removeCannedResponseFail(errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(cannedResponseActions.removeCannedResponseSuccess(data));
    notification.success({ message: 'Canned response remove success' });
    // yield put(push('/admin/user'));
  }
}


function* cannedResponseFetchByUser() {
  const result = yield call(CannedReponseAPI.getListAll, {});
  const response = _get(result, 'response', {});
  const error = _get(result, 'error');
  const data = _get(response, 'data.result', []);
  if (error || response.status !== 200) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(cannedResponseActions.fetchCannedResponseForUserFail(errMsg));
  } else {
    yield put(cannedResponseActions.fetchCannedResponseForUserSuccess(data));
  }
}


function* cannedResponseFlow() {
  yield takeEvery([CANNED_RESPONSE_SORTING, CANNED_RESPONSE_CHANGE_PAGE], queryCannedRespones);
  yield takeEvery(CANNED_RESPONSE_ADD_NEW, addNewCannedResponse);
  yield takeEvery(CANNED_RESPONSE_FETCH_SINGLE, cannedResponseFetchSingle);
  yield takeEvery(CANNED_RESPONSE_UPDATE, cannedResponseUpdate);
  yield takeEvery(CANNED_RESPONSE_REMOVE, cannedResponseRemove);
  yield takeEvery(CANNED_RESPONSE_FETCH_BY_USER, cannedResponseFetchByUser);
  while (1) {
    const action = yield take(CANNED_RESPONSE_FETCH_LIST);
    yield call(fetchList, action);
  }
}

export default cannedResponseFlow;
