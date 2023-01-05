import { Wrapper } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import Card from "../../Generic/Card";
import countWork from "../../assets/images/countWork.png";
import otk from "../../assets/images/OTK.svg";
import attandanceImg from "../../assets/images/attandance.png";

const Flow = () => {
  const { idFlow } = useParams();
  const navigate = useNavigate();
  const authDate = useAuthUser();
  const dateNow = new Date();

  return (
    <Wrapper>
      <Wrapper.Container>
        <Wrapper.Title>Поток № {idFlow}</Wrapper.Title>
        <Wrapper.SectionCardContainer>
          <Card
            isHome={true}
            title={"Посещаемость"}
            image={attandanceImg}
            onClick={() =>
              navigate(`/flow/${idFlow}/attandance/${dateNow.getTime()}`)
            }
          />
          <Card
            isHome={true}
            title={"Штук работ"}
            image={countWork}
            onClick={() =>
              navigate(`/flow/${idFlow}/count-work/${dateNow.getTime()}`)
            }
          />
        </Wrapper.SectionCardContainer>
        {authDate()?.flowType === "superAdmin" && (
          <Wrapper.SectionCardContainer>
            <Card
              isHome={true}
              title={"ОТК"}
              image={otk}
              onClick={() =>
                navigate(`/flow/${idFlow}/otk/${dateNow.getTime()}`)
              }
            />
          </Wrapper.SectionCardContainer>
        )}
      </Wrapper.Container>
    </Wrapper>
  );
};

export default Flow;
