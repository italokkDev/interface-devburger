import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background: #3c3c3c;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  width: 300px;
  left: 0;        
            color: #fff;
            position: fixed;
            height: 100%;
            padding-top: 20px;
          
  hr{
   margin: 50px 15px;
  }
`;

export const ItemContainer = styled.div`
height: 60px;
display: flex;
align-items: center;

background: ${(props) => (props.isActive ? "#565656;" : "none")}; 
border-radius: 5px;
margin: 20px;
padding: 25px;

.icon{
color: #ffffff;
}


`;

export const ListLink = styled(Link)`
text-decoration: none;
color: #ffffff;
padding: 5px;
font-size: 16px;

`;

