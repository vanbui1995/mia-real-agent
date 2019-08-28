import styled from 'styled-components';

export const DashboardContainer = styled.section`
  background-color: #f5f6f7;
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const DashboardItem = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  background-color: ${props => props.theme.colorStyled.ColorWhite}
  box-shadow: 0px 0px 8px -2px #d9d9d9;
  .ant-tabs-bar {
    margin: 16px 0px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    &:hover {
      color: #ff5402;
    }
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #ff5402;
  }
  .ant-tabs-ink-bar {
    background-color: #ff5402;
  }
`;
