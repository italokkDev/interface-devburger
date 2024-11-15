import styled from "styled-components";

import ReactSelect from 'react-select'


export const Container = styled.div`
background: #efefef;
min-height: 100vh;
padding: 20px

`;


export const SelectStyle = styled(ReactSelect)`
width: 200px;

.css-1xc3v61-indicatorContainer{
    cursor: pointer;
    }
    
    `;

export const Menu = styled.div`
display: flex;
gap: 50px;
justify-content: center;
margin: 20px 0;
`;

export const LinkMenu = styled.a`
  color: ${(props) => (props.isActive ? "#323050" : "#9758a6")}; 
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "3px solid #9758a6" : "none")};
  font-weight: bold;
`;



export default SelectStyle;
    
    