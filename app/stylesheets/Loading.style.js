/**
 * Created by vienpn on 21/08/19.
 */
import styled, { css, keyframes} from 'styled-components';

const size = '8em';
const sizeSmall = '4em';
const rotate = keyframes`
 0% {
    transform: rotateX(-37.5deg) rotateY(45deg);
  }
  50% {
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
  100% {
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
`;

const topAnimation = keyframes`
  0% { opacity: 1; transform: rotateX(90deg) translateZ(${size})}  
  20% { opacity: 1; transform: rotateX(90deg) translateZ(calc(${size}/2))}  
  70% {  opacity: 1; transform: rotateX(90deg) translateZ(calc(${size}/2)) }
  90% {  opacity: 1; transform: rotateX(90deg) translateZ(${size}) }
  100% {  opacity: 1; transform: rotateX(90deg) translateZ(${size}) }
`;

const bottomAnimation = keyframes`
  0% { opacity: 1; transform: rotateX(-90deg) translateZ(${size})}  
  20% { opacity: 1; transform: rotateX(-90deg) translateZ(calc(${size}/2))}  
  70% {  opacity: 1; transform: rotateX(-90deg) translateZ(calc(${size}/2)) }
  90% {  opacity: 1; transform: rotateX(-90deg) translateZ(${size}) }
  100% {  opacity: 1; transform: rotateX(-90deg) translateZ(${size}) }
`;

const frontAnimation = keyframes`
  0% { opacity: 1; transform: rotateY(0deg) translateZ(${size})}  
  20% { opacity: 1; transform: rotateY(0deg) translateZ(calc(${size}/2))}  
  70% {  opacity: 1; transform: rotateY(0deg) translateZ(calc(${size}/2)) }
  90% {  opacity: 1; transform: rotateY(0deg) translateZ(${size}) }
  100% {  opacity: 1; transform: rotateY(0deg) translateZ(${size}) }
`;

const backAnimation = keyframes`
  0% { opacity: 1; transform: rotateY(-180deg) translateZ(${size})}  
  20% { opacity: 1; transform: rotateY(-180deg) translateZ(calc(${size}/2))}  
  70% {  opacity: 1; transform: rotateY(-180deg) translateZ(calc(${size}/2)) }
  90% {  opacity: 1; transform: rotateY(-180deg) translateZ(${size}) }
  100% {  opacity: 1; transform: rotateY(-180deg) translateZ(${size}) }
`;

const leftAnimation = keyframes`
  0% { opacity: 1; transform: rotateY(-90deg) translateZ(${size})}  
  20% { opacity: 1; transform: rotateY(-90deg) translateZ(calc(${size}/2))}  
  70% {  opacity: 1; transform: rotateY(-90deg) translateZ(calc(${size}/2)) }
  90% {  opacity: 1; transform: rotateY(-90deg) translateZ(${size}) }
  100% {  opacity: 1; transform: rotateY(-90deg) translateZ(${size}) }
`;

const rightAnimation = keyframes`
  0% { opacity: 1; transform: rotateY(90deg) translateZ(${size})}  
  20% { opacity: 1; transform: rotateY(90deg) translateZ(calc(${size}/2))}  
  70% {  opacity: 1; transform: rotateY(90deg) translateZ(calc(${size}/2)) }
  90% {  opacity: 1; transform: rotateY(90deg) translateZ(${size}) }
  100% {  opacity: 1; transform: rotateY(90deg) translateZ(${size}) }
`;

export const LoadingStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  background: #f8f9f9;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 0 auto;
    width: 50%;
  }
  .cube, .cube * {
    position: absolute;
    width: calc(${size} + 1px);
    height: calc(${size} + 1px);
  }
  .sides {
    animation: ${rotate} 3s ease infinite;
    animation-delay: .8s;
    transform-style: preserve-3d;
    transform: rotateX(-37.5deg) rotateY(45deg);
  }
  .cube .sides * {
    box-sizing: border-box;
    background-color: #ff9e1699;
    border: calc(${size} / 10) solid white;
  }
  .cube .sides {
    .top{
      animation: ${topAnimation} 3s ease infinite;
      animation-delay: calc(0*100ms);
      transform: rotateX(90deg) translateZ(${size});
      animation-fill-mode: forwards;
      transform-origin: 50% 50%;
    }
    .bottom{
      animation: ${bottomAnimation} 3s ease infinite;
      animation-delay: calc(0*100ms);
      transform: rotateX(-90deg) translateZ(${size});
      animation-fill-mode: forwards;
      transform-origin: 50% 50%;
    }
    .front{
      animation: ${frontAnimation} 3s ease infinite;
      animation-delay: calc(1*100ms);
      transform: rotateX(0deg) translateZ(${size});
      animation-fill-mode: forwards;
      transform-origin: 50% 50%;
    }
    .back{
      animation: ${backAnimation} 3s ease infinite;
      animation-delay: calc(1*100ms);
      transform: rotateX(-180deg) translateZ(${size});
      animation-fill-mode: forwards;
      transform-origin: 50% 50%;
    }
    .left{
      animation: ${leftAnimation} 3s ease infinite;
      animation-delay: calc(1*100ms);
      transform: rotateX(-90deg) translateZ(${size});
      animation-fill-mode: forwards;
      transform-origin: 50% 50%;
    }
    .right{
      animation: ${rightAnimation} 3s ease infinite;
      animation-delay: calc(1*100ms);
      transform: rotateX(90deg) translateZ(${size});
      animation-fill-mode: forwards;
      transform-origin: 50% 50%;
    }
  }
  .text {
    margin-top: calc(${size} * 3);
    color: #000;
    font-size: 1.5rem;
    width: 100%;
    font-weight: 600;
    text-align: center;
  }
`;


