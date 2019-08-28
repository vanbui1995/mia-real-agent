import styled, { css } from 'styled-components';
import { Menu } from 'antd';
import { COLOR_BY_STATUS } from '../../../common/enums';

export const MenuStyled = styled(Menu)`
  background-color: transparent !important;

  li{
    margin-top: 5px;
    height: 30px !important;
  }

  svg{
    text-align: end;
    font-size: 1.3em;
  }

  .ant-menu-submenu-arrow{
    display: none;
  }

  .ant-menu-submenu-title{
    padding-right: 5px !important;
  }
`;

export const ConversationGroup = styled.div`
  flex: 1;
  line-height: normal;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ConversationName = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ConversationTime = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: normal;
  i {
    &:hover {
      color: #f9ba59;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ConversationStatus = styled.div`
  span {
    font-size: 13px;
    &:first-child {
      padding-right: 10px;
    }
    &:last-child {
      padding: 10px;
      ${({ status }) => status
    && css`
        font-style: italic;
        color: ${[COLOR_BY_STATUS[status]]};
        opacity: 0.8;
      `};
    } 
  }

`;

export const ConversationItemWrapper = styled.div`
  height: calc(100% - 120px);
`;

export const ConversationFilterWrapper = styled.div`
  padding: 15px 24px;
  border-top: 1px solid #d9d9d9;
  .ant-select {
    margin-top: 5px;
    border-radius: 4px;
  }
  .ant-select-selection--multiple {
    color: ${props => props.theme.colorStyled.ColorWhite};
    border: 1px solid #d9d9d9;
    &:hover {
      border-color: #b1b1b1;
    }
  }
  .ant-select-open .ant-select-selection {
    border-color: #b1b1b1;
    box-shadow: none;
  }
  @media (max-width: 1024px) {
    padding: 15px;
  }
  @media (max-width: 840px) {
    display: none;
  }
`;

export const ConversationPaginationWrapper = styled.div`
  padding: 0 16px;
  text-align: center;
  .ant-pagination-item,
  .ant-pagination-prev,
  .ant-pagination-next {
    height: auto !important;
    line-height: normal !important;
    &:hover {
      a {
        color: ${props => props.theme.colorStyled.ColorBgDefault};
      }
    }
  }
  .ant-pagination-item.ant-pagination-item-active a {
    color: ${props => props.theme.colorStyled.ColorBlack};
  }
  .ant-pagination-item-active {
    border: none;
    a {
      color: ${props => props.theme.colorStyled.ColorBgDefault} !important;
    }
    &:hover {
      color: ${props => props.theme.colorStyled.ColorBgDefault};
    }
  }
  @media (max-width: 840px) {
    display: none;
  }
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
`;
