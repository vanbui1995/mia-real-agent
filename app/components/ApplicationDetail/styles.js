import styled from 'styled-components';

export const ArrayWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  margin: 0 -10px;
`;

export const ArrayTagWrapper = styled.div`
  width: 100%;
  padding: 15px 20px;
  margin: 10px;  
  border: 1px solid #efeaea;
  position: relative;
  color: ${props => props.theme.colorStyled.ColorBlackTertiary};

  h2 {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 40px);
    font-weight: 600;
    font-size: 1.1em;
  }

  i:first-child {
    margin-left: 10px;
  }
  i {
    margin-right: 5px;
  }
  i:last-child {
    margin-right: 0;
  }
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  position: relative;
  p {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
    width: calc(100% - 40px);
    float: unset !important;
  }
`;

export const DescriptionNumber = styled.p`
  position: absolute;
  top: -8px;
  font-size: 1.6em;
  right: 0;
  text-align: right;
  margin-top: 0 !important;
`;

export const TagAction = styled.div`
  position: absolute;
  top: 15px;
    right: 15px;
`;
