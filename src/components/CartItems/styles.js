import styled from "styled-components";

export const ProductImage = styled.img`
height: 80px;
width: 80px;
border-radius: 16px;


`;

export const ButtonGroup = styled.div`
display: flex;
align-items: center;
gap: 12px;

button{
    color: #fff;
    background-color: #9758A6;
    height: 24px;
    width: 24px;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;

    
&:hover{
    background-color: #6f357c;
}


}


`;

export const EmptyCart = styled.p`
font-size: 20px;
text-align: center;
font-weight: bold;



`;

export const ProducTotalPrice = styled.p`
font-weight: bold;
`;

export const TrashImage = styled.img`
cursor: pointer;
`;