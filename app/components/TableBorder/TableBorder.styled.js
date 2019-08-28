import styled, { css } from 'styled-components';

export const TableBorderWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableBorderTopHeader = styled.div`
  box-shadow: 0px 0px 10px -6px #000;
  padding: 15px 20px;
  position: relative;
  z-index: 1;
`;

export const TableBorderContent = styled.div`
  flex: 1;
  position: relative;
`;

export const HeaderTitle = styled.div`
  display: inline;
  margin-right: 20px;
  ${({ left }) => left
    && css`
      float: right;
    `};
`;

export const PaginationBlockStyled = styled.div`
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const TableLoadingStyled = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  background: ${props => props.theme.colorStyled.ColorWhite};
  z-index: 1;
  top: 40px;
`;

export const PaginationInfoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 130px;
  width: 70px;
`;
