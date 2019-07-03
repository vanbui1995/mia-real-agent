import styled from 'styled-components';

export const TicketPageWrapper = styled.div`
  max-width: 980px;
  width: calc(100% - 30px);
  margin: 0 auto;
`;

export const TicketFilterWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 3px;
  height: 32px;
  flex: 0 0 70%;
  font-size: 13px;
  > * {
    height: 100%;
  }
  input {
    border: 1px solid #d9d9d9;
    border-left: none;
    background-color: #fff;
    box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
    border-radius: 0px 3px 3px 0px;
    padding: 0px 8px;
    flex: 1;
    &::placeholder {
      opacity: 0.6;
    }
  }
  .ant-menu {
    position: absolute;
    left: 0px;
    top: 35px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    width: 220px;
    height: fit-content;
    box-shadow: 0 3px 12px #1b1f2326 !important;
    overflow: hidden;
    .ant-menu-item {
      cursor: pointer;
      margin: 0px !important;
      border-bottom: 1px solid #d9d9d9;
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      &:last-child {
        border-bottom: none !important;
      }
      &:hover {
        background-color: #ff5402;
        border-bottom: 1px solid #ff5402;
        color: #fff;
      }
    }
    .ant-menu-item.ant-menu-item-selected {
      background-color: #ff5402;
      border-bottom: 1px solid #ff5402;
      color: #fff;
    }
  }
`;

export const Filter = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 3px 0px 0px 3px;
  overflow: hidden;
  display: flex;
  align-items: center;
  a {
    background-color: #fff;
    background-image: linear-gradient(-180deg,#fff,#eff3f6 90%);
    background-position: -1px -1px;
    background-repeat: repeat-x;
    background-size: 110% 110%;
    font-weight: 700;
    color: #444d56;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    height: 100%;
    &:hover {
      color: #000;
    }
    &:first-child {
      border-right: 1px solid #d9d9d9;
    }
  }
  i {
    margin-left: 5px;
    font-size: 12px;
  }
  &:hover {
    border-color: #1b1f2359;
  }
`;

export const CreateItem = styled.div``;

export const TicketWrapper = styled.div``;
