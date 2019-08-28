import React from 'react';
import moment from 'moment';
import { Tooltip, Icon } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import {
  MessageBoxItem, MessageText,
  UserMessage, ProfileImageStyled,
  MessageBoxSystemNotification, LineDivider, MessageBoxItemIsTyping, IsTypingWrapper, TicketActionStatus, UserAction, TicketActionStatusTitle, TicketRatingScore, CommentWrapper,
} from './styles';
import { ROLES } from '../../../common/enums';
import { toI18n } from '../../utils/func-utils';

const renderTime = time => moment(time).format('hh:mm');


export const userChat = (msgId, contents, isPending = false) => (
  <MessageBoxItem right key={msgId}>
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="right" title={renderTime(sentAt)}>
          <UserMessage key={_id} pending={isPending}>
            {messages}
          </UserMessage>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const otherChat = (msgId, contents, avatar) => (
  <MessageBoxItem left key={msgId}>
    <ProfileImageStyled
      src={avatar}
    />
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="left" title={renderTime(sentAt)}>
          <p key={_id}>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const botChat = (msgId, contents) => (
  <MessageBoxItem left key={msgId}>
    <ProfileImageStyled
      src="/assets/images/mia-avatar.jpg"
    />
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="left" title={renderTime(sentAt)}>
          <p key={_id}>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const otherTyping = messages => (
  <MessageBoxItemIsTyping left key="UserTyping">
    <ProfileImageStyled
      src="/assets/images/user-live.jpeg"
    />
    <MessageText>
      <p>{messages.trim()}</p>
      <IsTypingWrapper />
    </MessageText>
  </MessageBoxItemIsTyping>
);

export const ticketStatus = (msgId, params, sentAt) => {
  const { status } = params;
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {toI18n('CONV_MESSAGE_BOX_TICKET_CHANGED_TO')}
        <TicketActionStatus status={status} />
        <TicketActionStatusTitle status={status}>{status}</TicketActionStatusTitle>
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};

export const userAction = (msgId, currentTicket, from, params, sentAt) => {
  const { action } = params;
  const { owner, assignee } = currentTicket;
  let messageOwner = '';
  if (_isEmpty(currentTicket)) {
    return null;
  }
  // eslint-disable-next-line no-underscore-dangle
  if (owner._id === from) {
    const { role, profile = {} } = owner;
    const { firstName, lastName, company = 'N/A' } = profile;
    switch (role) {
      case ROLES.INDIVIDUAL:
        messageOwner = `${firstName} ${lastName}`;
        break;
      default:
        messageOwner = company;
        break;
    }
  } else {
    const { profile } = assignee || {};
    const { firstName, lastName } = profile || {};
    messageOwner = `${firstName} ${lastName}`;
  }
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {
          `${messageOwner} `
        }
        {toI18n('CONV_MESSAGE_BOX_USER_IS')}
        {' '}
        <UserAction action={action}>{action}</UserAction>
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};

export const ticketRating = (msgId, currentTicket, params, sentAt) => {
  const { score, comment } = params;
  if (_isEmpty(currentTicket)) {
    return null;
  }
  const { owner } = currentTicket;
  const { role, profile = {} } = owner;
  const { firstName, lastName, company = 'N/A' } = profile;
  let messageOwner = '';
  switch (role) {
    case ROLES.INDIVIDUAL:
      messageOwner = `${firstName} ${lastName}`;
      break;
    default:
      messageOwner = company;
      break;
  }
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {
          `${messageOwner} `
        }
        {toI18n('CONV_MESSAGE_BOX_TICKET_RATING')}
        <TicketRatingScore>
          {Array(...Array(Math.floor(score))).map(() => (
            <Icon type="star" theme="filled" />
          ))}
        </TicketRatingScore>
        {toI18n('CONV_MESSAGE_BOX_TICKET_RATING_COMMENT')}
        {' '}
        <CommentWrapper>
          {comment}
        </CommentWrapper>
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};
