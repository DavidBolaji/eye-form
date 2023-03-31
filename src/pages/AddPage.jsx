import React, { useState } from "react";
import { useSelector } from "react-redux";
import StepWizard from "react-step-wizard";
import EyeSpecificForm from "../Components/EyeSpecificForm";
import FailedForm from "../Components/FailedForm";
import NewTreatmentData from "../Components/NewTreatmentData";
import SubjectForm from "../Components/SubjectForm";

const AddPage = () => {
  const [SW, setSW] = useState(null);
  const curId = useSelector((state) => state.user.curId);
  return (
    <StepWizard initialStep={1} instance={setSW}>
      <SubjectForm id={curId} />
      <EyeSpecificForm id={curId} />
      <NewTreatmentData id={curId} />
      <FailedForm id={curId} />
    </StepWizard>
  );
};

export default AddPage;
