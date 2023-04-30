import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StepWizard from 'react-step-wizard';
import EyeSpecificForm from '../Components/EyeSpecificForm';
import FailedForm from '../Components/FailedForm';
import NewTreatmentData from '../Components/NewTreatmentData';
import ScrollToTopOnNavigation from '../Components/ScrollToTopOnNavigation';
import SubjectForm from '../Components/SubjectForm';

const AddPage = () => {
  const [SW, setSW] = useState(null);
  const curId = useSelector((state) => state.user.curId);
  const whatEye = useSelector((state) => state.user.whatEye);

  const handleChange = (event, currentStep, nextStep) => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="">
      <StepWizard initialStep={1} instance={setSW} onStepChange={handleChange}>
        <SubjectForm />
        <EyeSpecificForm />
        <NewTreatmentData whatEye={whatEye} />
        {/* <FailedForm id={curId} whatEye={whatEye} /> */}
      </StepWizard>
    </div>
  );
};

export default AddPage;
