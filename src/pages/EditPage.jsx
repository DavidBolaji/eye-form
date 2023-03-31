import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StepWizard from "react-step-wizard";
import EyeSpecificForm from "../Components/EyeSpecificForm";
import FailedForm from "../Components/FailedForm";
import NewTreatmentData from "../Components/NewTreatmentData";
import ScrollToTopOnNavigation from "../Components/ScrollToTopOnNavigation";
import SubjectForm from "../Components/SubjectForm";

const EditPage = () => {
  const [SW, setSW] = useState(null);
  const { id, stage } = useParams();

  let initialStep = 1;
  if (stage === "2") {
    initialStep = 2;
  }

  if (stage === "3") {
    initialStep = 3;
  }

  if (stage === "4") {
    initialStep = 4;
  }
  const handleChange = () => {
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   // Scroll the page to the top
  //   window.scrollTo(0, 0);
  // }, [SW.NavigationInstance.currentStep]);

  return (
    <>
      <StepWizard
        initialStep={initialStep}
        instance={setSW}
        onStepChange={handleChange}
      >
        <SubjectForm id={id} />
        <EyeSpecificForm id={id} />
        <NewTreatmentData id={id} />
        <FailedForm id={id} />
      </StepWizard>
    </>
  );
};

export default EditPage;
