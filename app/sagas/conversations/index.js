import {
  takeLatest, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { getConversation, getConversationMessage } from '../../api/conversation';
import {
  CONVERSATION_FETCH,
  actions,
  CONVERSATION_SET_CURRENT,
  getConverationById,
  fetchConversation as fetchConversationAction,
} from '../../reducers/conversations';
import {
  REPLIES_FETCH,
  fetchReplyMessagesSuccess,
  fetchReplyMessagesFailed,
  getReplyMessagesByConversationId,
  fetchReplyMessages,
} from '../../reducers/replies';

function* fetchConversationMessages({ payload }) {
  const { conversationId } = payload;
  if (!conversationId) return;
  try {
    const { response, error } = yield call(getConversationMessage, conversationId);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(fetchReplyMessagesSuccess(conversationId, data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversationMessages] ERROR:', error.message);
    yield put(fetchReplyMessagesFailed(conversationId, error.message || error));
  }
}

function* setCurrentConversation({ payload }) {
  const { conversationId } = payload;
  const conversation = yield select(getConverationById, conversationId);
  const replies = yield select(getReplyMessagesByConversationId, conversationId);
  if (_isEmpty(conversation)) {
    yield put(fetchConversationAction(conversationId));
  }
  if (_isEmpty(replies)) {
    yield put(fetchReplyMessages(conversationId));
  }
}

function* fetchConversation({ payload }) {
  const { conversationId } = payload;
  try {
    const { response, error } = yield call(getConversation, conversationId);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(actions.fetchConversationSuccess(data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversation] ERROR:', error.message);
    yield put(actions.fetchConversationFailed(error.message || error));
  }
}

function* conversationFlow() {
  yield takeLatest(CONVERSATION_FETCH, fetchConversation);
  yield takeLatest(CONVERSATION_SET_CURRENT, setCurrentConversation);
  yield takeLatest(REPLIES_FETCH, fetchConversationMessages);
}

export default conversationFlow;
