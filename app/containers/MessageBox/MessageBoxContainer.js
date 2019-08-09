import { connect } from 'react-redux';
import { getUserId, getUserRole } from 'reducers/auth';
import {
  isFetchingReplies,
  getErrorMessage,
  getReplyMessagesByConversationId,
  getSendingMessages,
  getSendingMessagesError,
  sendReplyMessage,
} from '../../reducers/replies';
import {
  actions,
} from '../../reducers/ticket';
import {
  getTicketById, getCurrentTicket,
} from '../../selectors/ticket';
import {
  getCurrentConveration,
  getConverationById,
  actions as CONVERSATION_ACTIONS,
  getSystemMessage,
  getOtherUserTyping,
} from '../../reducers/conversations';
import {
  isFindingAgent,
  findAgentRequest,
} from '../../reducers/agents';
import MessageBox from '../../components/MessageBox';

const mapStateToProps = (state) => {
  const conversationId = getCurrentConveration(state);

  return ({
    conversationId,
    userId: getUserId(state),
    currentConversation: getConverationById(state, conversationId),
    currentTicket: getTicketById(state, getCurrentTicket(state)),
    isFetchingReplies: isFetchingReplies(state, conversationId),
    errorMessage: getErrorMessage(state, conversationId),
    replyMessages: getReplyMessagesByConversationId(state, conversationId),
    sendingMessages: getSendingMessages(state, conversationId),
    sendingMessageErrors: getSendingMessagesError(state, conversationId),
    isFindingAgent: isFindingAgent(state, conversationId),
    userRole: getUserRole(state),
    systemMessage: getSystemMessage(state),
    otherUserTyping: getOtherUserTyping(state),
  });
};

const mapDispatchToProps = {
  setCurrentTicket: actions.selectTicket,
  sendReplyMessage,
  findAgentRequest,
  submitRating: CONVERSATION_ACTIONS.submitConversationRating,
  joinConversation: CONVERSATION_ACTIONS.userJoinConversation,
  leftConversation: CONVERSATION_ACTIONS.userLeftConversation,
  userTyping: CONVERSATION_ACTIONS.userTyping,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
