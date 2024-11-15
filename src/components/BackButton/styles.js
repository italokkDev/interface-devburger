import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  right: 20px;
  bottom: 20px;
  border: none;
  box-shadow: none;
  width: 130px;
  height: 40px;
  line-height: 42px;
  perspective: 230px;
  background: transparent;
  cursor: pointer;
  margin-top: 15px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center; 
  margin-left : 47%;
  span {
    
    font-size: 25px;
    font-weight: bold;
    background: linear-gradient(0deg, #800080 0%, #EE82EE 100%);
    display: block;
    position: absolute;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    text-align: center;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
                7px 7px 20px 0px rgba(0, 0, 0, .1),
                4px 4px 5px 0px rgba(0, 0, 0, .1);
    transition: all 0.3s;
  }

  span:nth-child(1) {
    transform: rotateX(90deg);
    transform-origin: 50% 50% -20px;
    box-shadow: -7px -7px 20px 0px #fff9, 
                -4px -4px 5px 0px #fff9, 
                 7px 7px 20px 0px #0002, 
                 4px 4px 5px 0px #0001;
  }

  span:nth-child(2) {
    transform: rotateX(0deg);
    transform-origin: 50% 50% -20px;
  }

  &:hover span:nth-child(1) {
    transform: rotateX(0deg);
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
                7px 7px 20px 0px rgba(0, 0, 0, .1),
                4px 4px 5px 0px rgba(0, 0, 0, .1);
  }

  &:hover span:nth-child(2) {
    transform: rotateX(-90deg);
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
                7px 7px 20px 0px rgba(0, 0, 0, .1),
                4px 4px 5px 0px rgba(0, 0, 0, .1);
    color: transparent;
  }
`;

export default Button;