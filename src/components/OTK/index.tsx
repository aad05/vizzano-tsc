import { Wrapper } from "./style";
import Card from "../../Generic/Card";
import { useNavigate } from "react-router-dom";
import otk from "../../assets/images/OTK.svg";
import { Title } from "../../Generic/Styles/style";

const OTK = () => {
  const navigate = useNavigate();
  const date = new Date();
  return (
    <Wrapper>
      <Wrapper.Container>
        <Title>ОТК</Title>
        <Wrapper.SectionCardContainer>
          <Card
            title={"ОТК № 1"}
            image={otk}
            onClick={() => navigate(`/flow/1/otk/${date.getTime()}`)}
          />
          <Card
            title={"ОТК № 2"}
            onClick={() => navigate(`/flow/2/otk/${date.getTime()}`)}
            image={otk}
          />
        </Wrapper.SectionCardContainer>
        <Wrapper.SectionCardContainer>
          <Card
            title={"ОТК № 3"}
            image={otk}
            onClick={() => navigate(`/flow/3/otk/${date.getTime()}`)}
          />
          <Card
            title={"ОТК № 4"}
            image={otk}
            onClick={() => navigate(`/flow/4/otk/${date.getTime()}`)}
          />
        </Wrapper.SectionCardContainer>
        <Wrapper.SectionCardContainer>
          <Card
            title={"ОТК № 5"}
            onClick={() => navigate(`/flow/5/otk/${date.getTime()}`)}
            image={otk}
          />
        </Wrapper.SectionCardContainer>
      </Wrapper.Container>
    </Wrapper>
  );
};

export default OTK;
