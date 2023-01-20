import styled, { keyframes } from "styled-components";
import paternBg from "../../assets/icons/Pattern.svg";
import blob from "../../assets/icons/blob.svg";

const appearAnimation = keyframes`
  0%{
    transform:scale(0.4);
    opacity: 0;
  }
  100%{
    transform:scale(1);
    opacity:1;
  }

`;
const appearAnimation2 = keyframes`
  0%{
    transform:scale(3);
    opacity: 0;
    
  }
  100%{
    transform:scale(1);
    opacity:1;
  }

`;
const appearAnimation3 = keyframes`
  0%{
    transform:translateX(600px);
    opacity: 0;
    
  }
  100%{
    transform:translateX(0);
    opacity:1;
  }

`;
export const Wrapper: any = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #404040;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
Wrapper.BG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${paternBg});
  background-color: #404040;
  animation: ${appearAnimation2} 2s 1;
`;

Wrapper.TextSection = styled.div`
  width: 700px;
  height: 500px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearAnimation} 3s 1;
`;

Wrapper.Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 200px;
  text-align: center;
  color: #6a63fe;
  margin-bottom: -50px;
  @media (max-width: 500px) {
    font-size: 100px;
    margin-bottom: -10px;
  }
`;
Wrapper.Text = styled.p<{ bold: true }>`
  font-style: normal;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  font-size: 25px;
  color: #ffffff;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 18px;
    width: 90%;
  }
`;
Wrapper.Btn = styled.button`
  cursor: pointer;
  width: 200px;
  height: 55px;
  background: #6a63fe;
  border-radius: 60px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  border: none;
  color: #ffffff;
  margin-top: 30px;
  transition: all ease-in 0.3s;
  @media (max-width: 500px) {
    font-size: 18px;
    width: 150px;
    height: 45px;
  }
  :hover {
    background-color: #ffffff;
    border: 1px solid #6a63fe;
    color: #6a63fe;
  }
`;

Wrapper.Blob = styled.div`
  background-image: url(${blob});
  width: 700px;
  height: 700px;
  position: absolute;
  bottom: 0;
  right: 0;
  animation: ${appearAnimation3} 2s 1;
`;
