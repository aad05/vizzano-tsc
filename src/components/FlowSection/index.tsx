import { FC, lazy } from "react";
import { useParams } from "react-router-dom";
import CountWork from "./CountWork";
import OTK from "./OTK";

const Attandances = lazy(() => import("./Attandances"));

const FlowSection: FC = () => {
  const { flowSectionType } = useParams();
  return (
    <div>
      {flowSectionType === "attandance" ? (
        <Attandances />
      ) : flowSectionType === "otk" ? (
        <OTK />
      ) : (
        <CountWork />
      )}
    </div>
  );
};

export default FlowSection;
