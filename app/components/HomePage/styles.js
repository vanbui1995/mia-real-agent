import styled, { keyframes } from 'styled-components';

export const MiaWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const MiaTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  font-family: CountrySide, sans-serif;
`;

const slideFadeInUp = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const MiaIntro = styled.div`
  display: flex;
  font-size: 24px;
`;

export const MiaIntroDynamic = styled.div`
  margin-left: 5px;
  animation: ${slideFadeInUp} 1.5s ease infinite;
`;

export const MiaIntroStatic = styled.div`
`;

export const MiaMessengerImg = styled.img`
  margin-right: 10px;
`;

export const MiaLinkText = styled.span`
`;

export const MiaMessengerLink = styled.a`
  background: #0084ff;
  height: 45px;
  width: 260px;
  font-size: 14;
  font-weight: bold;
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colorStyled.ColorWhite};
  margin-top: 25px;
  box-shadow: 0px 0px 20px 0px rgba(0, 131, 254, 0.57);
  transition: .3s ease;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    box-shadow: 0px 3px 20px 2px rgba(0, 131, 254, 0.57);
  }
`;

export const MiaFBLogin = styled.div`
  margin-top: 22.5px;
`;

export const MiaLoginText = styled.a`
  color: #3b5998;
  cursor: pointer;
  margin-left: 5px;
`;
