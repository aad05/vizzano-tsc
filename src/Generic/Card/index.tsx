import { FC } from "react";
import { Wrapper } from "./style";

interface CardProp {
  title: string;
  image: any;
  onClick: () => void;
  isHome?: boolean;
}

const Card: FC<CardProp> = ({ title, image, onClick, isHome }) => {
  return (
    <Wrapper isHome={isHome} onClick={onClick}>
      <Wrapper.Title>{title}</Wrapper.Title>
      <Wrapper.Image isHome={isHome} loading="lazy" src={image} />
    </Wrapper>
  );
};

export default Card;
