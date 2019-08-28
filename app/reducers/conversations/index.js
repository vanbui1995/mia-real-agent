/* eslint-disable no-underscore-dangle */
import { fromJS, Set as ISet } from 'immutable';

export const CONVERSATION_FETCH = 'conversations/CONVERSATION_FETCH';
export const CONVERSATION_FETCH_SUCCESS = 'conversations/CONVERSATION_FETCH_SUCCESS';
export const CONVERSATION_FETCH_FAILED = 'conversations/CONVERSATION_FETCH_FAILED';

export const CONVERSATION_GET_DETAIL = 'conversations/CONVERSATION_GET_DETAIL';
export const CONVERSATION_GET_DETAIL_SUCCESS = 'conversations/CONVERSATION_GET_DETAIL_SUCCESS';
export const CONVERSATION_GET_DETAIL_FAILED = 'conversations/CONVERSATION_GET_DETAIL_FAILED';

export const CONVERSATION_SET_CURRENT = 'conversations/CONVERSATION_SET_CURRENT';

export const USER_JOIN_CONVERSATION = 'conversations/USER_JOIN_CONVERSATION';

export const USER_LEFT_CONVERSATION = 'conversations/USER_LEFT_CONVERSATION';

export const USER_TYPING = 'conversations/USER_TYPING';

export const OTHER_USER_TYPING = 'conversations/OTHER_USER_TYPING';

export const SYSTEM_MESSAGE = 'conversations/SYSTEM_MESSAGE';

export const FOUND_SOLUTION = 'chat/FOUND_SOLUTION';

// action creator
export const foundSolution = conversationId => ({
  type: FOUND_SOLUTION,
  payload: {
    conversationId,
  },
});

const userJoinConversation = conversationId => ({
  type: USER_JOIN_CONVERSATION,
  payload: {
    conversationId,
  },
});

const userLeftConversation = conversationId => ({
  type: USER_LEFT_CONVERSATION,
  payload: {
    conversationId,
  },
});

const userTyping = (conversationId, messages) => ({
  type: USER_TYPING,
  payload: {
    conversationId,
    messages,
  },
});

const otherUserTyping = (conversationId, messages) => ({
  type: OTHER_USER_TYPING,
  payload: {
    conversationId,
    messages,
  },
});

const notifiSystemMessage = (systemMessage, conversationId) => ({
  type: SYSTEM_MESSAGE,
  payload: {
    conversationId,
    systemMessage,
  },
});

// FETCH SINGLE CONVERSATION

export const fetchConversation = conversationId => ({
  type: CONVERSATION_FETCH,
  payload: {
    conversationId,
  },
});

export const fetchConversationSuccess = conversation => ({
  type: CONVERSATION_FETCH_SUCCESS,
  payload: {
    conversation,
  },
});

export const fetchConversationFailed = error => ({
  type: CONVERSATION_FETCH_FAILED,
  payload: {
    error,
  },
});

// FETCH CONVERSATION DETAIL

export const getConversationDetail = id => ({
  type: CONVERSATION_GET_DETAIL,
  payload: {
    id,
  },
});

export const getConversationDetailSuccess = conversation => ({
  type: CONVERSATION_GET_DETAIL_SUCCESS,
  payload: {
    conversation,
  },
});

export const getConversationDetailFailed = error => ({
  type: CONVERSATION_GET_DETAIL_FAILED,
  payload: {
    error,
  },
});

// SELECT CONVERSATION

export const selectConversation = conversationId => ({
  type: CONVERSATION_SET_CURRENT,
  payload: {
    conversationId,
  },
});


// selector
export const getConverationList = ({ conversations }) => {
  const byId = conversations.get('byId').toJS();
  const allIds = conversations.get('allIds').toJS();
  return allIds.map(id => byId[id]);
};
export const getCurrentConveration = ({ conversations }) => conversations.get('currentConversation');
export const getConverationById = ({ conversations }, _id) => conversations.get('byId').get(_id);
export const getTotalConverations = ({ conversations }) => conversations.get('total');
export const getErrorMessage = ({ conversations }) => conversations.get('errorMsg');
export const isFetchingList = ({ conversations }) => conversations.get('isFetchingAll');
export const isFetchingSingleItem = ({ conversations }) => conversations.get('isFetchingSingleItem');
export const getConversationListByTicketList = ({ conversations }, ticketIdList) => {
  const ticketIdSet = new Set(ticketIdList);
  const byId = conversations.get('byId').toJS();

  return conversations
    .get('allIds')
    .toJS()
    .filter(id => ticketIdSet.has(byId[id].ticketId))
    .reduce((acc, id) => {
      acc[byId[id].ticketId] = byId[id];
      return acc;
    }, {});
};
export const getConversationById = ({ conversations }, conversationId) => conversations.getIn(['byId', conversationId]);

export const getSystemMessage = ({ conversations }) => conversations.get('systemMessage');

export const getOtherUserTyping = ({ conversations }) => conversations.get('otherUserTyping').toJS();

export const getSolution = ({ conversations }) => conversations.get('solution').toJS();

const initialState = fromJS({
  byId: {},
  allIds: new ISet(),
  total: 0,
  errorMsg: '',
  isFetchingAll: false,
  isFetchingSingleItem: false,
  currentConversation: null,
  systemMessage: {},
  otherUserTyping: {},
  solution: [],
});

function conversationReducer(state = initialState, action) {
  switch (action.type) {
    case FOUND_SOLUTION: {
      const { conversationId } = action.payload;
      const solution = state.get('solution').push(conversationId);
      return state
        .set('solution', fromJS(solution));
    }

    case SYSTEM_MESSAGE: {
      const { systemMessage, conversationId } = action.payload;
      const sentAt = new Date();
      return state
        .set('systemMessage', { message: systemMessage, sentAt, conversationId });
    }
    case OTHER_USER_TYPING: {
      const { conversationId, messages } = action.payload;
      return state
        .set('otherUserTyping', fromJS({ conversationId, messages }));
    }

    case CONVERSATION_FETCH: {
      return state
        .set('isFetchingAll', true)
        .set('isFetchingSingleItem', false)
        .set('errorMsg', '');
    }

    case CONVERSATION_FETCH_SUCCESS: {
      const { conversation } = action.payload;
      let newState = state;
      let allIds = newState.get('allIds');

      allIds = allIds.add(conversation._id);
      newState = newState.setIn(['byId', conversation._id], conversation);

      return newState
        .set('isFetchingAll', false)
        .set('isFetchingSingleItem', false)
        .set('allIds', allIds)
        .set('total', newState.get('total') + 1);
    }

    case CONVERSATION_GET_DETAIL_FAILED:
    case CONVERSATION_FETCH_FAILED: {
      const { error } = action.payload;
      return state
        .set('isFetchingAll', false)
        .set('isFetchingSingleItem', false)
        .set('errorMsg', error);
    }

    case CONVERSATION_GET_DETAIL: {
      return state
        .set('isFetchingSingleItem', true)
        .set('isFetchingSingleItem', false)
        .set('errorMsg', '');
    }

    case CONVERSATION_SET_CURRENT: {
      const { conversationId } = action.payload;
      return state.set('currentConversation', conversationId);
    }

    case CONVERSATION_GET_DETAIL_SUCCESS: {
      const { conversation } = action.payload;
      const { _id: id } = conversation;
      const allIds = state.get('allIds').add(id);

      return state
        .setIn(['byId', id], conversation)
        .set('allIds', allIds)
        .set('total', state.get('total') + 1);
    }

    default: {
      return state;
    }
  }
}

export default conversationReducer;

export const actions = {
  foundSolution,

  fetchConversation,
  fetchConversationSuccess,
  fetchConversationFailed,

  selectConversation,

  userJoinConversation,
  userLeftConversation,
  userTyping,
  notifiSystemMessage,
  otherUserTyping,
};

export const selectors = {
  getCurrentConveration,
  getTotalConverations,
  getErrorMessage,
  isFetchingList,
  isFetchingSingleItem,
};
