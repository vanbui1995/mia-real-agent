import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DashboardInfoUser = styled.div`
  color: ${props => props.theme.colorStyled.ColorBlack};
  font-size: 14px;
`;

export const DashboardLink = styled.a`
  font-weight: 600;
  color: ${props => props.theme.colorStyled.ColorBlack};
  margin:0 3px;
`;

export const DashboardTime = styled.span`
  color: #6a737d;
  font-size: 13px;
`;

export const DashboardDesc = styled.span`
  margin:0 3px;
`;

export const DashboardSubTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 0px;
`;

export const DashboardLinkTitle = styled(Link)`
  color: ${props => props.theme.colorStyled.ColorBlack};
  font-weight: 600;
  &:hover {
    color: #ff5402;
  }
`;

export const DashboardContent = styled.div`
  display: flex;
  padding: 16px;
  background-color: ${props => props.theme.colorStyled.ColorWhite}
  border: 1px solid #d1d5da;
  border-radius: 3px;
`;

export const DashboardTitle = styled.div`
  color: ${props => props.theme.colorStyled.ColorBlack};
`;

export const DashboardLeftBlock = styled.div`
  flex: 0 0 24px;
`;

export const DashboardRightBlock = styled.div`
  flex: 1;
`;

export const DashboardSubDesc = styled.span`
  color: ${props => props.theme.colorStyled.ColorBlack};
  margin-bottom: 15px;
`;

export const DashboardSubActivity = styled.span`
  color: #586069;
  font-size: 12px;
  text-transform: lowercase;
`;

export const DashboardStatus = styled.div`
  flex: 0 0 50px;
  text-align: center;
`;