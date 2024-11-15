import styled from "styled-components";
  import { Link } from "react-router-dom";


export const Container = styled.div `
background-color: #1f1f1f;
width: 100%;
height: 72px;
padding: 0 56px; 
`;

export const Content = styled.div `
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
max-width: 1280px;
margin: 0 auto;
`;

export const Navigation = styled.nav `
display: flex;
align-items: center;
justify-content: center;
height: 72px;

div{
    margin-left: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-weight: bold;

    hr{
        height: 25px;
        border: 1px solid #625e5e;
    }
}


`;



export const HeaderLink = styled(Link) `
color: ${(props) => (props.$isActive ? '#9758A6' : '#ffffff')};
text-decoration: none;
border-bottom: ${(props) => (props.$isActive ? '1px solid #9758A6' : 'none')};
padding-bottom: 5px;
font-size: 18px;
transition: color 1000ms;


&:hover {
color: #9758A6;
}



`;
export const Options = styled.div `
display: flex;
align-items: center;
justify-content: center;
gap: 48px;




`;
export const Profile = styled.div `
display: flex;
align-items: center;
font-size: 14px;
gap: 12px;


p{
    color: #fff;
    line-height: 90%;
    font-weight: 300;

    span {
font-weight: 800;
color: #fff;

    }
}


`;
export const LinkContainer = styled.div `
display: flex;
align-items: center;
gap: 10px;

`;
export const Logout = styled.button `

color: #ff3205;
text-decoration: none;
font-weight: 700;
background-color: transparent;
border: none;
`;


export const CartBadge = styled.span`
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
`;
