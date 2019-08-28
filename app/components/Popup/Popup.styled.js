import styled, { css } from 'styled-components';

export const PopupOverlayWrapper = styled.div`
  content: '';
  width: 100vw;
  height: 100vh;
  background: #00000087;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 1;
`;

export const PopupModalWrapper = styled.div`
  position: absolute;
  color: ${props => props.theme.colorStyled.ColorBlack};
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  max-width: 580px;
  width: calc(100% - 30px);
  transform: translate(-50%, -50%);
  box-shadow: 0px 2px 17px -4px #00000080;
  z-index: 2;
`;

export const PopupHeader = styled.div`
  text-transform: uppercase;
  font-size: 18px;
  padding: 10px 20px;
  border-bottom: 1px solid #d9d9d9;
  ${({ error }) => error && css`
    background-color: #b52d2d;
    border-bottom: 1px solid #b52d2d;
    color: ${props => props.theme.colorStyled.ColorWhite}
  `};
`;

export const PopupContent = styled.div`
  padding: 12px 20px;
`;

export const PopupGroupAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px 20px;
  button {
    margin-left: 10px;
  }
`;
