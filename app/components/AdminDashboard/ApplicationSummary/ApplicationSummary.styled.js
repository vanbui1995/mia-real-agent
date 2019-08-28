import styled from 'styled-components';

export const TicketActivityQuantityGroup = styled.div`
@media (max-width: 1024px) {
  display: flex;
}
`;

export const TicketActivityQuantityItem = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
border: 1px solid #dae1e4;
border-radius: 7px;
background-color: ${props => props.theme.colorStyled.ColorWhite};
margin-bottom: 15px;
padding: 15px 18px;
height: 50px;
&:hover {
  border: 1px solid #ff5402;
}
@media (max-width: 1024px) {
  flex: 1;
  &:first-child {
    margin-right: 20px;
  }
}
`;

export const TicketActivityQuantityContent = styled.div`
font-size: 13px;
color: #666;
text-transform: uppercase;
`;

export const TicketActivityQuantityNumber = styled.div`
font-size: 25px;
position: relative;
&:before {
  content: '';
  position: absolute;
  left: -10px;
  top: 0;
  width: 1px;
  height: 30px;
  background-color: #dae1e4;
}
`;
