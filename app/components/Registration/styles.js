import styled, { keyframes } from 'styled-components';
import { Input } from 'antd';
import { LogoSite, LoginWrapper } from '../Login/styles';

export const RegistrationWrapper = styled(LoginWrapper)`
`;

export const RegistrationItem = styled.div`
  width: 720px;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  box-shadow: ${props => props.theme.boxShandow.loginPage};
  padding: 50px;
  color: #6e6c83fa;
  position: relative;
  z-index: 1;
`;

export const RegistrationTitle = styled(LogoSite)`
  
`;

export const RegistrationInputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
`;

export const RegistrationInput = styled(Input)`
  width: 100% !important;
  height: 27.5px !important;
  border: 0 !important;
  padding: 0 !important;
  outline: 0 none !important;
  -webkit-transition: border-color .2s linear !important;
  transition: border-color .2s linear !important;
  border-bottom: 1px solid #000 !important;
  -webkit-font-smoothing: antialiased !important;
  border-radius: 0 !important;  
  :focus {
    box-shadow: none !important;
  }
`;

export const RegistrationLabel = styled.div`
  margin-bottom: 7.5px;
  color: ${props => props.theme.colorStyled.ColorBlack};
`;

export const RegistrationBtn = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 50px;
  border: 1px solid ${props => props.theme.colorStyled.ColorBlack};
  transition: .3s ease;
  background: ${props => props.theme.colorStyled.ColorBlack};
  color: ${props => props.theme.colorStyled.ColorWhite};
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${props => props.theme.colorStyled.ColorWhite};
    color: ${props => props.theme.colorStyled.ColorBlack};
  }
`;


export const RegistrationFooter = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const RegistrationFooterText = styled.span`
`;

export const RegistrationFooterLink = styled.a`
  margin-left: 3px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const RegistrationSpinner = styled.div`
  border: 2px solid;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-color:black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: 5px;
  display: inline-block;
`;

export const RegistrationErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 15px;
`;

export const SelectStyled = { width: '100%' };

export const InputWrapper = styled.div`
  margin: 0 20px 20px 10px;
  /* max-height: 450px;
  overflow: overlay; */
`;
