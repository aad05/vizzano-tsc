import { Wrapper } from "./style";
import Card from "../../Generic/Card";
import { useNavigate } from "react-router-dom";
import potok1 from "../../assets/images/potok-1.svg";
import potok2 from "../../assets/images/potok-2.svg";
import potok3 from "../../assets/images/potok-3.svg";
import potok4 from "../../assets/images/potok-4.svg";
import potok5 from "../../assets/images/potok-5.svg";
import basement from "../../assets/images/basement.png";
import report from "../../assets/images/report.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Wrapper.Container>
        <Wrapper.Title>Поток</Wrapper.Title>
        <Wrapper.SectionCardContainer>
          <Card
            title={"Поток № 1"}
            image={potok1}
            onClick={() => navigate("/flow/1")}
          />
          <Card
            title={"Поток № 2"}
            onClick={() => navigate("/flow/2")}
            image={potok2}
          />
        </Wrapper.SectionCardContainer>
        <Wrapper.SectionCardContainer>
          <Card
            title={"Поток № 3"}
            image={potok3}
            onClick={() => navigate("/flow/3")}
          />
          <Card
            title={"Поток № 4"}
            image={potok4}
            onClick={() => navigate("/flow/4")}
          />
        </Wrapper.SectionCardContainer>
        <Wrapper.SectionCardContainer>
          <Card
            title={"Поток № 5"}
            onClick={() => navigate("/flow/5")}
            image={potok5}
          />
        </Wrapper.SectionCardContainer>
        <Wrapper.Title first>Склад и Отчет</Wrapper.Title>
        <Wrapper.SectionCardContainer>
          <Card
            title={"Склад"}
            image={basement}
            onClick={() => navigate("/store")}
          />
          <Card
            title={"Отчет"}
            onClick={() => navigate("/report")}
            image={report}
          />
        </Wrapper.SectionCardContainer>
      </Wrapper.Container>
    </Wrapper>
  );
};

export default Home;
