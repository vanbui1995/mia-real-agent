import styled, { css } from 'styled-components';

export const TableHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  height: 60px;
  .icon-close {
    font-size: 25px;
    &:hover {
      opacity: 0.6;
    }
  }
`;

export const TableHeaderLeftWrapper = styled.div`
  position: relative;
  font-size: 20px;
  font-family: 'Proxima Nova Light';
  .select__option {
    border-color: #ddd;
    cursor: pointer;
  }
  .select__control {
    border: none;
  }
  .select__indicator-separator {
    display: none;
  }
  .select__single-value,
  .select__placeholder {
    color: #222;
    font-size: 20px;
    font-family: 'Proxima Nova Light';
  }
  .select__value-container {
    min-width: 190px;
    font-size: 14px;
    padding: 2px 0px;
  }
  .select__indicator svg {
    width: 15px;
    height: 15px;
    color: #222;
  }
  .select__control--is-focused {
    box-shadow: none;
    border-color: ${props => props.theme.colorStyled.ColorWhite} !important;
  }
  .select__option--is-focused {
    background-color: ${props => props.theme.colorStyled.ColorWhite};
  }
`;

export const TableHeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
  }
`;

export const TableHeaderAddNewButton = styled.div`
  background-color: ${props => props.theme.colorStyled.ColorBgDefault};
  border-color: ${props => props.theme.colorStyled.ColorBgDefault};
  border-radius: 3px;
  color: ${props => props.theme.colorStyled.ColorWhite};
  padding: 5px 12px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  i {
    margin-right: 3px;
    font-size: 20px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const TableHeaderSortButton = styled.div`
  position: relative;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    border-color: #7d7d7d;
    box-shadow: 0 1px 1px #0000001a;
  }
`;

export const TableHeaderSortWrapper = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  min-width: 260px;
  padding: 5px 0;
  margin: 2px 0 0;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  border: 1px solid #00000026;
  border-radius: 2px;
  box-shadow: 0 6px 12px #0000002d;
  z-index: 5;
  &:before {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid;
    border-bottom-color: rgba(0, 0, 0, 0.05);
    top: -10px;
    content: '';
    right: 8px;
    position: absolute;
  }
  &:after {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid;
    border-bottom-color: ${props => props.theme.colorStyled.ColorWhite};
    top: -8px;
    content: '';
    right: 10px;
    position: absolute;
  }
`;

export const TableHeaderSortTitle = styled.div`
  color: #999;
  font-size: 13px;
  padding: 2px 20px 3px;
`;

export const TableHeaderSortContent = styled.div`
  padding: 5px 20px;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  align-items: center;
  i {
    margin-left: 7px;
    margin-bottom: 2px;
  }

  .icon-export {
    margin-left: 0px;
    margin-right: 5px;
  }

  &:hover {
    color: ${props => props.theme.colorStyled.ColorWhite};
    background-color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
  }
  ${({ active }) => active
    && css`
      color: ${props => props.theme.colorStyled.ColorWhite};
      background-color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
    `};
`;

export const TableHeaderFilterWrapper = styled(TableHeaderSortWrapper)`
  left: 0px;
  right: unset;
  font-size: 15px;
  &:before {
    top: -10px;
    right: 130px;
    position: absolute;
  }
  &:after {
    top: -8px;
    right: 132px;
    position: absolute;
  }
`;

export const TableHeaderLeftTitle = styled.span`
  i {
    margin-left: 10px;
    font-size: 15px;
  }
`;
