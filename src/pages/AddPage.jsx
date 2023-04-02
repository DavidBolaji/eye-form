import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StepWizard from "react-step-wizard";
import EyeSpecificForm from "../Components/EyeSpecificForm";
import FailedForm from "../Components/FailedForm";
import NewTreatmentData from "../Components/NewTreatmentData";
import ScrollToTopOnNavigation from "../Components/ScrollToTopOnNavigation";
import SubjectForm from "../Components/SubjectForm";

const AddPage = () => {
  const [SW, setSW] = useState(null);
  const curId = useSelector((state) => state.user.curId);
  const whatEye = useSelector((state) => state.user.whatEye);
  const handleChange = (event, currentStep, nextStep) => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <StepWizard initialStep={1} instance={setSW} onStepChange={handleChange}>
        <SubjectForm id={curId} />
        <EyeSpecificForm id={curId} />
        <NewTreatmentData id={curId} whatEye={whatEye} />
        {/* <FailedForm id={curId} whatEye={whatEye} /> */}
      </StepWizard>
    </>
  );
};

export default AddPage;
