import styled from "styled-components";

interface SVGProp {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
}

export const Svg = styled.svg<SVGProp>`
  width: 25vh;
  height: 25vh;
  position: absolute;
  top: ${({ top }) => top && top};
  bottom: ${({ bottom }) => bottom && bottom};
  right: ${({ right }) => right && right};
  left: ${({ left }) => left && left};
  z-index: 1;
`;
