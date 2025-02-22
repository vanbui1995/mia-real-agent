/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import {
  Layout, Icon, Input, Tooltip, Tabs,
} from 'antd';
import _get from 'lodash/get';
import TicketList from 'containers/TicketList';
import history from 'utils/history';
import { Return } from 'components/Generals/General.styled';
import MessageBoxContainer from '../../containers/MessageBox';
import {
  ChatbotWrapper,
  ChatbotConversationListWrapper,
  ChatbotContentWrapper,
  ConversationHeaderWrapper,
} from './Chatbot.styled';
import CreateConversationFormContainer from '../../containers/Chatbot/CreateTicket';
import EditConversationContainer from '../../containers/Chatbot/EditTicket';
import { isAgent, toI18n } from '../../utils/func-utils';

const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

export default class ChatbotComponent extends Component {
  state = {
    isOpenCreateModal: false,
    isOpenSettingModal: false,
    settingChosenConversation: null,
  }

  static propTypes = {
    errorMsg: PropTypes.string,
    userRole: PropTypes.string,
    currentConversation: PropTypes.objectOf(PropTypes.any),
    selectConversation: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentConversation: null,
  }

  componentDidMount = () => {
    const { currentConversation, selectConversation } = this.props;
    const id = _get(this.props, 'match.params.id', null);

    if (!currentConversation) {
      selectConversation(id);
      return;
    }

    // const ticketId = _get(this.props, 'match.params.ticketId', null);

    // eslint-disable-next-line no-underscore-dangle
    if (id !== currentConversation._id) {
      selectConversation(id);
    }
  }

  handleOpenCreateModal = () => {
    this.setState({
      isOpenCreateModal: true,
    });
  }

  handleCloseCreateModal = () => {
    this.setState({
      isOpenCreateModal: false,
    });
  }

  handleOpenSettingModal = (ticket) => {
    this.setState({
      isOpenSettingModal: true,
      settingChosenConversation: ticket,
    });
  }

  handleCloseSettingModal = () => {
    this.setState({
      isOpenSettingModal: false,
    });
  }

  goToDashboard = () => {
    history.push('/dashboard/ticket/1');
  }

  renderConversationHeader = () => {
    const { userRole } = this.props;
    return (
      <ConversationHeaderWrapper>
        <Return onClick={this.goToDashboard}>
          <Icon type="left" />
          <span>
            {toI18n('MENU')}
          </span>
        </Return>
        {!isAgent(userRole) && (
          <Tooltip title="Create ticket" onClick={this.handleOpenCreateModal}>
            <Icon type="copy" />
            <span className="create-ticket">
              {toI18n('CREATE')}
              Ticket
            </span>
          </Tooltip>
        )}
      </ConversationHeaderWrapper>
    );
  }

  renderSearchConversation = () => (
    <ConversationHeaderWrapper search>
      <Translation>
        {
          t => (
            <Search
              placeholder={t('SEARCH')}
            />
          )
        }
      </Translation>
    </ConversationHeaderWrapper>
  );

  renderTabItem = () => (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Detail" key="1" />
      <TabPane tab="List" key="2" />
    </Tabs>
  )

  render() {
    const { isOpenCreateModal, isOpenSettingModal, settingChosenConversation } = this.state;
    const { currentConversation } = this.props;

    return (
      <ChatbotWrapper>
        <ChatbotConversationListWrapper>
          {this.renderConversationHeader()}
          {this.renderSearchConversation()}
          <TicketList
            openSetting={this.handleOpenSettingModal}
          />
        </ChatbotConversationListWrapper>
        <ChatbotContentWrapper>
          <Content>
            <MessageBoxContainer ticket={currentConversation} />
          </Content>
        </ChatbotContentWrapper>
        <CreateConversationFormContainer
          isOpen={isOpenCreateModal}
          handleCancel={this.handleCloseCreateModal}
        />
        <EditConversationContainer
          isOpen={isOpenSettingModal}
          ticket={settingChosenConversation}
          handleCancel={this.handleCloseSettingModal}
        />
      </ChatbotWrapper>
    );
  }
}
