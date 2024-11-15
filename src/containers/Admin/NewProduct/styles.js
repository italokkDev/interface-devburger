import styled from "styled-components";
import Button from "../../../components/Button";

export const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;

.css-13cymwt-control{
 margin-bottom: 10px;
}
    
form{
   background: #565656;
   padding: 30px;
   border-radius: 10px;
   width: 350px;
  
   .messageError{
    font-size: 14px;
        line-height: 80%;
        color: #cf3057;
        font-weight: 600;
        height: 10px;
        margin-bottom: 20px;
   }
}
`;

export const Label = styled.p`
font-size: 14px;
color: #ffffff;
margin-bottom: 3px;

`;

export const Input = styled.input`
height: 40px;
background: #ffffff;
box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
border-radius: 8 px;
margin-bottom: 5px;
width: 100%; 
padding: 10px;
`;


export const ButtonStyles = styled(Button)`
margin-top: 20px;
`;

export const LabelUpload = styled.label`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
border-radius: 5px;
border: 1px dashed #ffffff;
padding: 10px;
margin-bottom: 10px;
color: #ffffff;
gap: 20px;

input{
   opacity: 0;
   width: 1px;
}

`;

