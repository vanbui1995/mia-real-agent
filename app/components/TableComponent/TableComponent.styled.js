/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { COLOR_BY_STATUS } from '../../../common/enums';

export const TableHeadWrapper = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colorStyled.ColorBlackSecondary};
  border-bottom: 1px solid #d9d9d9;
  color: #666;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  font-weight: 700;
  line-height: 1.4;
  font-size: 12px;
  min-height: 35px;
  ${({ bgTable }) => bgTable
    && css`
      background-color: #222;
      color: #fff;
      border: none;
      font-size: 13px;
      & > div {
        border: none;
        text-transform: capitalize;
        color: #fff;
      }
    `};
  ${({ textLarger }) => textLarger
    && css`
      color: #222;
      font-size: 15px;
    `};
  ${({ noBorderTop }) => noBorderTop
    && css`
      border-top: none;
    `};
`;

export const TableHeadItemGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: ${props => (props.isPointer ? 'pointer' : 'default')};
`;

export const TableContentItemGroup = styled(TableHeadItemGroup)`
  padding: 10px 0px;
`;

export const TableContentWrapper = styled.div`
  border-bottom: 1px solid #d9d9d9;
  border-top: none;
  color: #263035;
  font-weight: 700;
  line-height: 1.4;
  ${({ bgTable }) => bgTable
    && css`
      border: none;
      font-size: 14px;
      & > div {
        & > div {
          border: none;
        }
      }
    `};
  ${({ error }) => error
    && css`
      border: 1px solid #ad4444;
    `};
`;

export const TableContentItem = styled.div`
  display: flex;
  flex: 1;
  border: none;
  min-height: 68px;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  border-radius: 3px;
  &:hover {
    background-color: #f7f7f7;
  }
  ${({ noHover }) => noHover
    && css`
      &:hover {
        background-color: transparent;
      }
    `};
  ${({ ticket }) => ticket && css`
    border: 1px solid #d9d9d9;
    margin-bottom: 15px;
  `}
`;

export const TableDetailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TableDetailImages = styled.div`
  flex: 0 0 45px;
  max-height: 45px;
  height: 45px;
  border: 1px solid #d9d9d9;
  padding: 5px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TableUserImages = styled(TableDetailImages)`
  flex: 0 0 60px;
  max-height: 60px;
  height: 60px;
  border-radius: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
  }
`;

export const TableDetailContent = styled.div`
  margin-left: 10px;
  font-size: 15px;
  line-height: 21px;
  color: #206ec5;
  cursor: pointer;
  span {
    display: flex;
    align-items: center;
    p {
      margin-left: 5px;
      font-size: 13px;
      font-weight: 500;
    }
  }
  ${({ colorStatus }) => colorStatus
    && css`
      p {
        color: #388a10;
      }
    `};
`;

export const TableDetailSubContent = styled.div`
  color: #777;
  font-size: 13px;
  font-family: 'Proxima Nova Light';
  text-transform: uppercase;
  ${({ lowercase }) => lowercase
    && css`
      text-transform: lowercase;
    `};
`;

export const MoreAction = styled.div`
  position: relative;
`;

export const MoreActionWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 20px;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 6px 12px #0000002d;
  z-index: 2;
  cursor: pointer;
`;

export const MoreActionItem = styled.div`
  padding: 3px 20px;
  line-height: 1.4;
  font-size: 13px;
  &:hover {
    color: ${props => props.theme.colorStyled.ColorWhite};
    background-color: #2e8fda;
  }
`;

export const TableHead = styled.div`
  flex: 1;
  padding: 0 5px;
  padding: 8px;
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 14px;
  color: #586069;
  ${({ size }) => size
    && css`
      flex: 0 0 ${size}px;
      @media (max-width: 480px) {
        flex: 0 0 60px;
      }
    `};
  ${({ percent }) => percent
    && css`
      flex: 0 0 ${percent}%;
    `};
  ${({ textRight }) => textRight
    && css`
      justify-content: flex-end;
    `};
  ${({ textCenter }) => textCenter
    && css`
      justify-content: center;
    `};
  ${({ borderRight }) => borderRight
    && css`
      border-right: 1px solid #e6e6e6;
    `};
  ${({ checkbox }) => checkbox
    && css`
      display: flex;
      align-items: center;
      justify-content: center;
    `};
  ${({ bgChild }) => bgChild
    && css`
      background-color: #f7f7f7;
    `};
  ${({ widthInput }) => widthInput
    && css`
      text-transform: capitalize;
      input {
        margin-right: 10px;
      }
    `};
  .anticon-caret-down {
    margin-left: 5px;
  }
  a {
    color: #586069;
    &:hover {
      color: #ff5402;
    }
  }
`;

export const TableRow = styled(TableHead)`
  text-transform: none;
  color: ${props => props.theme.colorStyled.ColorBlack};
  .icon-dots {
    font-size: 10px;
    color: #eee;
  }
  ${({ noPadding }) => noPadding
    && css`
      padding: 0px;
    `};
  ${({ status }) => status
    && css`
      text-transform: uppercase;
      /* color: ${[COLOR_BY_STATUS[status]]}; */
    `};
  ${({ active }) => active
    && css`
      .icon-dots {
        color: #0095d8;
      }
    `};
  ${({ input }) => input
    && css`
      input {
        width: 100%;
        text-align: center;
        padding: 5px 0px;
        min-height: 30px;
        &:focus {
          border-radius: 3px;
          border: 1px solid #ddd;
          padding: 5px 0px;
        }
      }
    `};
  ${({ image }) => image
    && css`
      max-height: 60px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    `};
  a {
    color: ${props => props.theme.colorStyled.ColorBlack};
  }
`;

export const TableEmptyContent = styled.div`
  text-align: center;
  padding: 20px;
`;

export const TableStatusContent = styled.span`
  ${({ status }) => status
    && css`
      font-style: italic;
      text-transform: uppercase;
      color: ${[COLOR_BY_STATUS[status]]};
    `};
`;
