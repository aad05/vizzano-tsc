import styled from "styled-components";
import { Input, Modal } from "antd";

export const Wrapper: any = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
// Left Designing
Wrapper.Left = styled.div`
  flex: 1;
  background: #2f67cc;
  position: relative;
  @media (max-width: 1150px) {
    display: none;
  }
`;
Wrapper.BackgroundImage = styled.div<{ imgUrl: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 65%;
  width: 65%;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-image: ${({ imgUrl }) => imgUrl && `url(${imgUrl})`};
  z-index: 2;
`;
// Ending Left Designing

// Right Designing
Wrapper.Right = styled.div`
  flex: 1;
  background: #fff;
`;
Wrapper.Right.Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 600px) {
    padding: 0 20% 0 20%;
  }
`;
Wrapper.Logo = styled.img<{ src: any }>`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 1px solid #f3f5f8;
  @media (min-width: 2000px) {
    height: 140px;
    width: 140px;
  }
`;
Wrapper.Title = styled.div`
  margin-top: 20px;
  font-size: 30px;
  color: #39384d;
  @media (min-width: 2000px) {
    font-size: 40px;
  }
`;
Wrapper.Description = styled.div<{ none: boolean }>`
  margin-top: ${({ none }) => !none && "10px"};
  color: #b2b0b8;
  text-align: ${({ none }) => !none && "center"};
  width: 80%;
  @media (min-width: 2000px) {
    font-size: 20px;
  }
`;
Wrapper.Input = styled(Input)`
  margin-top: 40px;
  width: 80%;
  height: 50px;
  background: #fafbfe;
  outline: none;
  border: 1px solid #f0eef7;
  border-radius: 12px;
  padding-left: 15px;
  color: #595a62;
  :hover {
    color: #5f95ec;
  }
  @media (min-width: 2000px) {
    height: 70px;
    font-size: 22px;
  }
`;

Wrapper.InputPassword = styled(Input.Password)`
  margin-top: 40px;
  width: 80%;
  height: 50px;
  background: #fafbfe;
  outline: none;
  border: 1px solid #f0eef7;
  border-radius: 12px;
  padding-left: 15px;
  color: #595a62;
  :hover {
    color: #5f95ec;
  }
  @media (min-width: 2000px) {
    height: 70px;
    font-size: 22px;
  }
`;
Wrapper.Scanner = styled.div<{ login: boolean; warningAnimation: boolean }>`
  margin-top: ${({ login }) => (login ? "50px" : "15px")};
  width: 80%;
  height: 50px;
  border: 1px solid #f0eef7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  padding: 0 15px;
  background: ${({ login }) =>
    login ? "#3068CC" : "linear-gradient(-30deg, #4d18ff, #9a7cff)"};
  @media (min-width: 2000px) {
    height: 70px;
    font-size: 22px;
  }
  ${({ warningAnimation }) =>
    warningAnimation &&
    `
    animation: rotate 0.7s ease-in-out both;
  @keyframes rotate {
    0% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
    25% {
      transform: rotate(3deg) translate3d(0, 0, 0);
    }
    50% {
      transform: rotate(-3deg) translate3d(0, 0, 0);
    }
    75% {
      transform: rotate(1deg) translate3d(0, 0, 0);
    }
    100% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
  }
  `}
`;
// Ending Right Designing

// Addintional Models
Wrapper.Modal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
  }
  .ant-modal-header {
    border-radius: 12px;
  }
  ${({ closeIcon }) =>
    closeIcon &&
    `
  .ant-modal-close-x {
    display: none;
  }
  `}
`;
Wrapper.AutoSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
Wrapper.AutoSignTitle = styled.div`
  @media (min-width: 2000px) {
    font-size: 22px;
  }
`;
