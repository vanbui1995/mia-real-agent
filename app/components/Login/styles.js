import styled, { css } from 'styled-components';

export const LoginWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/bg-login.jpg');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TemplateLoginPage = styled.div`
  width: ${props => props.theme.widthSite.widthLoginPage};
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  box-shadow: ${props => props.theme.boxShandow.loginPage};
  padding: 2em;
  color: ${props => props.theme.colorStyled.ColorDarkGrey};
  position: relative;
  z-index: 1;
`;

export const LogoSite = styled.div`
  text-align: center;
  font-size: 2em;
  width: 6.125em;
  height: 4.063em;
  margin: 0 auto 1em;
  color: ${props => props.theme.colorStyled.ColorBlack};
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
