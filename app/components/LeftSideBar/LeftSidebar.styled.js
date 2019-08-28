/* eslint-disable indent */
import styled, { css } from 'styled-components';

export const LeftSideBarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100vh;
  width: 260px;
  transition: all 300ms ease;
  background-image: url('/assets/images/bg-left-side-bar.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    background-color: #1d1d1d70;
  }
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  ${({ isToggle }) => isToggle
    && css`
        width: 50px;
      `};
`;

export const SidebarBlock = styled.ul`
  font-size: 14px;
  position: relative;
  z-index: 1;
  & > a {
    text-decoration: none;
    cursor: pointer;
  }
  @media (max-width: 1280px) {
    margin-top: 0px;
  }
`;

export const LogoWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 8px 15px;
`;

export const Logo = styled.img`
  width: 200px;
  height: 100%;
  margin: auto 0;
  object-fit: contain;
  cursor: pointer;
`;

export const IconToggle = styled.i`
  position: absolute;
  right: -32px;
  top: 14px;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  padding: 8px;
  box-shadow: 10px 0px 8px -8px #d9d9d9;
  border: 1px solid #d9d9d9;
  border-left: none;
  border-radius: 0px 50% 50% 0px;
  &:hover {
    border-color: #bbb;
  }
`;

export const SidebarToggleButton = styled.div`
  height: 60px;
  background-color: #8f8e90;
  border-right: 1px solid #ffffff33;
  border-bottom: 1px solid#ffffff33;
  cursor: pointer;
  position: relative;
  ${({ isToggle }) => isToggle && css`
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      display: none;
    }
    i {
      position: unset;
      background-color: transparent;
      border: none;
      box-shadow: none;
      color: ${props => props.theme.colorStyled.ColorWhite};
    }
  `};
`;


export const SidebarItem = styled.li`
  color: ${props => props.theme.colorStyled.ColorWhite};
  height: 40px;
  width: 230px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 8px 15px;
  padding: 12px 10px 12px 15px;
  background: transparent;
  border-radius: 4px;
  border: none;
  transition: all 300ms ease;
  & > span {
    line-height: 15px;
    margin-left: 10px;
  }
  &:hover {
    background-color: #bfbfbf9c;
  }
  ${({ actived }) => actived
    && css`
      background-color: #bfbfbf9c;
      color: #2fa3e6;
    `};
  ${({ isToggle }) => isToggle && css`
    width: auto;
    margin: 8px 0px;
    justify-content: center;
    span {
      display: none;
    }
  `};
`;
