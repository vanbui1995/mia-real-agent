/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Layout, Icon, Input, Tooltip, Tabs,
} from 'antd';
import {
  func, shape, string,
  bool,
} from 'prop-types';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Tickets from 'containers/Chatbot/Tickets';
import history from 'utils/history';
import TicketDetail from './TicketDetail/TicketDetail';
import MessageBoxContainer from '../../containers/Chatbot/MessageBox';
import {
  ChatbotWrapper,
  ChatbotTicketListWrapper,
  ChatbotContentWrapper,
  TicketHeaderWrapper,
  TicketEmpty,
} from './styles';
import { Return } from '../Generals/general.styles';
import CreateTicketFormContainer from '../../containers/Chatbot/CreateTicket';
import { ROLES } from '../../../common/enums';

const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

export default class ChatbotComponent extends Component {
  state = {
    isOpenCreateModal: false,
  }

  static propTypes = {
    getTicket: func.isRequired,
    ticketDetail: shape(),
    getError: string,
    userRole: string,
    isGetting: bool.isRequired,
  }

  static defaultProps = {
    ticketDetail: null,
  }

  componentDidMount = () => {
    const { getTicket } = this.props;
    const id = _get(this.props, 'match.params.id', null);
    const owner = _get(this.props, 'match.params.owner', null);
    if (id) {
      getTicket(id, owner);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      getTicket, getError, userRole, isGetting,
    } = this.props;
    const prevId = _get(prevProps, 'match.params.id', null);
    const prevOwner = _get(prevProps, 'match.params.owner', null);
    const id = _get(this.props, 'match.params.id', null);
    const owner = _get(this.props, 'match.params.owner', null);
    // Redirect when ticket not found
    if (!isGetting && prevProps.isGetting && getError) {
      history.push((userRole === ROLES.AGENT) ? '/dashboard' : '/ticket');
    }

    if (id && (prevId !== id || prevOwner !== owner)) {
      getTicket(id, owner);
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

  goToDashboard = () => {
    history.push('/dashboard');
  }

  renderTicketHeader = () => (
    <TicketHeaderWrapper>
      <Return onClick={this.goToDashboard}>
        <Icon type="left" />
        <span>MENU</span>
      </Return>
      <Tooltip title="Create ticket">
        <Icon type="edit" onClick={this.handleOpenCreateModal} />
      </Tooltip>
    </TicketHeaderWrapper>
  );

  renderSearchTicket = () => (
    <TicketHeaderWrapper search>
      <Search
        placeholder="Search on Ticket"
        onSearch={value => console.log(value)}
      />
    </TicketHeaderWrapper>
  );

  renderTabItem = () => (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Detail" key="1">
        <TicketDetail />
      </TabPane>
      <TabPane tab="List" key="2">
        <Tickets />
      </TabPane>
    </Tabs>
  )

  render() {
    const { isOpenCreateModal } = this.state;
    const { ticketDetail, getError } = this.props;
    return (
      <ChatbotWrapper>
        <ChatbotTicketListWrapper>
          {this.renderTicketHeader()}
          {this.renderSearchTicket()}
          {this.renderTabItem()}
        </ChatbotTicketListWrapper>
        <ChatbotContentWrapper>
          <Content>
            {(!_isEmpty(ticketDetail) && !getError) ? <MessageBoxContainer ticket={ticketDetail} /> : <TicketEmpty>Please select a ticket</TicketEmpty>}
          </Content>
        </ChatbotContentWrapper>
        <CreateTicketFormContainer
          isOpen={isOpenCreateModal}
          handleCancel={this.handleCloseCreateModal}
        />
      </ChatbotWrapper>
    );
  }
}
