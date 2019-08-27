import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon,
} from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { Translation } from 'react-i18next';
import { Formik } from 'formik';
import ShadowScrollbars from 'components/Scrollbar';
import {
  MessageBoxWrapper,
  MessageBoxContent,
  MessageBoxItem,
  ConversationHeaderTitle,
  MessageInputWrapper,
  MessageActionWrapper,
  MessageInput,
  MessageEmpty,
  InputAction,
  ConversationTitle,
  RatingWrapper,
  RatingContent,
  CommentInputWrapper,
  TicketStatus,
  MessageBoxSystemNotification,
  FindAgentButton,
  FindAgentWrapper,
} from './styles';
import LoadingSpin from '../Loading';
import ConversationDetail from '../ConversationDetail/ConversationDetail';
import { TICKET_STATUS, REPLY_TYPE, CLOSED_TICKET_STATUSES } from '../../../common/enums';
import FormInput from '../FormInput/FormInput';
import { combineChat } from './utils';
import { shouldShowSystemMessage, isAgent, toI18n } from '../../utils/func-utils';
import { ProfileImageStyled } from '../TopNavBar/TopNavBar.styled';
import {
  userChat, otherChat, otherTyping, botChat, ticketStatus, userAction,
} from './ChatItem';
import RichEditor from '../FormInput/RichEditor/RichEditor';

const scrollStyle = {
  height: 'calc(100% - 60px)',
  width: '100%',
};

const initialValues = {
  content: '',
};

export default class MessageBox extends Component {
  messagesEndRef = React.createRef();

  static propTypes = {
    userId: PropTypes.string.isRequired,
    conversationId: PropTypes.string,
    systemMessage: PropTypes.object,
    currentConversation: PropTypes.object,
    currentTicket: PropTypes.object,
    isFetchingReplies: PropTypes.bool,
    solutionFound: PropTypes.bool,
    isFindingAgent: PropTypes.bool,
    replyMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessageErrors: PropTypes.objectOf(PropTypes.any),
    otherUserTyping: PropTypes.object,

    t: PropTypes.func,
    findAgentRequest: PropTypes.func.isRequired,
    sendReplyMessage: PropTypes.func.isRequired,
    setCurrentTicket: PropTypes.func.isRequired,
    joinConversation: PropTypes.func.isRequired,
    leftConversation: PropTypes.func.isRequired,
    userTyping: PropTypes.func.isRequired,

    submitRating: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
  }

  static defaultProps = {
    currentConversation: {},
    currentTicket: {},
    isFetchingReplies: false,
    isFindingAgent: false,
    replyMessages: [],
    conversationId: '',
    sendingMessages: [],
    // sendingMessageErrors: {},
  }

  componentDidUpdate = (prevProps) => {
    this.scrollChatToBottom();
    const {
      conversationId,
      currentConversation, setCurrentTicket, joinConversation, leftConversation,
    } = this.props;
    const { conversationId: prevConversationId } = prevProps;
    if (conversationId !== prevConversationId) {
      joinConversation(conversationId);
      if (prevConversationId) {
        leftConversation(prevConversationId);
      }
    }
    if (!_isEmpty(currentConversation)) {
      const { ticketId: prevTicketId } = prevProps.currentConversation;
      const { ticketId } = currentConversation;
      if (ticketId !== prevTicketId) {
        setCurrentTicket(ticketId);
      }
    }
  }

  renderFindAgentForSolution = () => (
    <Translation>
      {
        t => (
          <MessageBoxItem left key="solution">
            <ProfileImageStyled
              src="/assets/images/mia-avatar.jpg"
              onClick={this.onToggleUserInfo}
            />
            <FindAgentWrapper>
              <p key="solution">
                {t('CONV_MESSAGE_BOX_NOT_SATISFY')}
              </p>
              <FindAgentButton
                key="button"
                type="primary"
                onClick={this.handleFindAgent}
              >
                <Icon type="search" />
                {t('CONV_MESSAGE_BOX_FIND_AGENT')}
              </FindAgentButton>
            </FindAgentWrapper>
          </MessageBoxItem>
        )
      }
    </Translation>
  )

  renderOtherUserMessageContent = (msgId, contents) => {
    const { userRole } = this.props;
    const src = isAgent(userRole) ? '/assets/images/user-live.jpeg' : '/assets/images/user.svg';
    return otherChat(msgId, contents, src);
  }

  renderOtherUserTypingContent = () => {
    const { otherUserTyping, conversationId } = this.props;
    const { conversationId: _id, messages = '' } = otherUserTyping || {};
    if (!_isEmpty(otherUserTyping)
      && _id === conversationId
      && !_isEmpty(messages.trim())
    ) {
      return otherTyping(messages);
    }
    return false;
  }

  renderMessageContent = () => {
    const {
      replyMessages, userId, userRole, currentTicket,
    } = this.props;
    const refinedMessages = combineChat(replyMessages);
    return [refinedMessages.map(({
      from, _id: msgId, contents, type, params, sentAt,
    }) => {
      switch (type) {
        case REPLY_TYPE.TICKET_STATUS:
          return ticketStatus(msgId, params, sentAt);
        case REPLY_TYPE.USER_ACTION:
          return userAction(msgId, currentTicket, from, params, sentAt);
        case REPLY_TYPE.BOT_RESPONSE:
          return botChat(msgId, contents);
        default:
          if (from === userId) {
            return userChat(msgId, contents, false, isAgent(userRole));
          }
          return this.renderOtherUserMessageContent(msgId, contents, from);
      }
    }),
    this.renderOtherUserTypingContent(),
    ];
  }

  renderPendingMessageContent = () => {
    const { sendingMessages } = this.props;
    if (!sendingMessages || !sendingMessages.length) return null;

    return combineChat(sendingMessages).map(({ id: msgId, contents }) => userChat(msgId, contents, true));
  }

  renderGroupAction = () => (
    <MessageActionWrapper>
      <InputAction className="mia-gallery" htmlFor="file-upload" />
      <InputAction className="mia-folder" htmlFor="file-upload" />
      <InputAction className="mia-camera" />
      <InputAction className="mia-happiness" />
      {/* <InputUpload type="file" id="file-upload" /> */}
    </MessageActionWrapper>
  );

  handleChatSubmit = (values) => {
    const {
      sendReplyMessage, conversationId, userTyping, userRole,
    } = this.props;
    const { content } = values;
    const trimmedContent = content.trim();
    if (trimmedContent) {
      sendReplyMessage(conversationId, trimmedContent);
      if (!isAgent(userRole)) {
        userTyping(conversationId, '');
      }
      this.formik.getFormikContext().resetForm();
    }
  }

  handleFindAgent = () => {
    const { findAgentRequest, conversationId } = this.props;

    findAgentRequest(conversationId);
  }

  handleTyping = (e) => {
    const { userTyping, conversationId, userRole } = this.props;
    if (!isAgent(userRole)) {
      const { value } = e.target;
      userTyping(conversationId, value);
    }
  }

  renderMessageInput = () => {
    const { t } = this.props;
    return (
      <Formik
        ref={(formik) => { this.formik = formik; }}
        initialValues={initialValues}
        onSubmit={this.handleChatSubmit}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
          >
            <MessageInputWrapper>
              <RichEditor mentions={[]} />
              {this.renderGroupAction()}
              <InputAction onClick={handleSubmit} className="mia-enter" />
            </MessageInputWrapper>
          </Form>
        )}
      </Formik>
    );
  }


  renderMessageHeader = () => {
    const { currentTicket } = this.props;
    const { title, status } = currentTicket || {};
    return (
      <ConversationHeaderTitle>
        <ConversationTitle>
          <TicketStatus status={status} />
          <span>{title}</span>
        </ConversationTitle>
      </ConversationHeaderTitle>
    );
  }

  scrollChatToBottom() {
    const { current } = this.messagesEndRef;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleSubmitRating = (values) => {
    const { submitRating, currentConversation } = this.props;
    const { _id } = currentConversation;
    submitRating(_id, values);
  }

  renderRating = () => {
    const { currentConversation } = this.props;
    const { rating } = currentConversation;
    return (
      <RatingWrapper>
        <RatingContent>
          <h2>
            {toI18n('CONV_MESSAGE_BOX_RATE_YOUR_EXPERIENCE')}
          </h2>
          <Formik
            ref={(formik) => { this.ratingFormik = formik; }}
            initialValues={rating}
            onSubmit={this.handleSubmitRating}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                onChange={this.handleChangeValues}
              >
                <FormInput type="rate" name="score" />
                <CommentInputWrapper>
                  <MessageInput type="text" name="comment" placeholder="Type comment ..." autoComplete="off" />
                  <InputAction onClick={handleSubmit} className="mia-enter" />
                </CommentInputWrapper>
              </Form>
            )}
          </Formik>
        </RatingContent>
      </RatingWrapper>
    );
  }


  render() {
    const {
      isFetchingReplies, isFindingAgent, otherUserTyping,
      replyMessages, currentTicket, systemMessage,
      conversationId, solutionFound, userRole,
    } = this.props;
    const { status, assignee } = currentTicket || {};
    const hasChatData = !_isEmpty(replyMessages)
      || shouldShowSystemMessage(systemMessage, conversationId)
      || !_isEmpty(otherUserTyping);
    return (
      <LoadingSpin loading={isFetchingReplies || isFindingAgent}>
        {this.renderMessageHeader()}
        <MessageBoxWrapper>
          <MessageBoxContent>
            {/* {status === TICKET_STATUS.SOLVED ? this.renderRating()
              : ( */}
            <>
              <ShadowScrollbars
                autoHide
                style={scrollStyle}
              >
                {!hasChatData
                  ? <MessageEmpty>{toI18n('CONV_MESSAGE_BOX_NO_CHAT_DATA')}</MessageEmpty>
                  : this.renderMessageContent()
                }
                {solutionFound && !isAgent(userRole) && _isEmpty(assignee)
                  && this.renderFindAgentForSolution()}
                {this.renderPendingMessageContent()}
                <div ref={this.messagesEndRef} />
              </ShadowScrollbars>
              {CLOSED_TICKET_STATUSES.includes(status) ? (
                <MessageBoxSystemNotification>
                  {toI18n('CONV_MESSAGE_BOX_TICKET_CLOSED')}
                </MessageBoxSystemNotification>
              ) : this.renderMessageInput()
              }
            </>
            {/* )} */}
          </MessageBoxContent>
          <ConversationDetail ticket={currentTicket} />
        </MessageBoxWrapper>
      </LoadingSpin>
    );
  }
}
