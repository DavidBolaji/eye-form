import { Divider, Space, Spin } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveStageOne, saveStageTwo } from "../actions/userAction";
import Axios from "../api/auth";

const initialValuesOut = {
  whatEye: "",
  presentingVisualAcuityL: "",
  presentingVisualAcuityR: "",
  causeOfVisionLossL: "",
  causeOfVisionLossLO: "",
  causeOfVisionLossR: "",
  causeOfVisionLossRO: "",
  cataractPresentL: "",
  cataractPresentR: "",
  noOfShotsL: "",
  noOfShotsR: "",
  noOfQuadrantsTreatedL: "",
  noOfQuadrantsTreatedR: "",
  powerUsedL: "",
  powerUsedR: "",
  procedureComplicationL: "",
  procedureComplicationR: "",
  IOP1L: "",
  IOP1R: "",
  IOP2L: "",
  IOP2R: "",
  MIOPL: "",
  MIOPR: "",
  IOP1HRL: "",
  IOP1HRR: "",
  IOP1DL: "",
  IOP1DR: "",
  IOP1ML: "",
  IOP1MR: "",
  IOP3ML: "",
  IOP3MR: "",
  IOP6ML: "",
  IOP6MR: "",
  IOP9ML: "",
  IOP9MR: "",
  IOP1YL: "",
  IOP1YR: "",
  COM1HRL: "",
  COM1HRR: "",
  COM1DL: "",
  COM1DR: "",
  COM3ML: "",
  COM3MR: "",
  COM6ML: "",
  COM6MR: "",
  COM1YL: "",
  COM1YR: "",
  CCTL: "",
  CCTR: "",
  ocularPainL: "",
  ocularPainR: "",
  ganioscopyL: "",
  ganioscopyR: "",
  openessOfQuadrantL: "",
  openessOfQuadrantR: "",
  opticNerveVisibleL: "",
  opticNerveVisibleR: "",
  verticalCupDiskRatioL: "",
  verticalCupDiskRatioR: "",
  visualFieldPerformedL: "",
  visualFieldNotPerformedL: "",
  visualFieldPerformedR: "",
  visualFieldNotPerformedR: "",
  meanDeviationL: "",
  meanDeviationR: "",
  patternSDL: "",
  patternSDR: "",
  perimeterL: "",
  perimeterR: "",

  //   hobbies: [],
};

const whatEye = ["left", "right", "both"];
const ocularPain = ["present", "absent"];
const openessOfQuadrant = ["open", "close", "narrow"];
const opticNerveVisible = ["yes", "no"];
const visualFieldPerformed = ["yes", "no"];
const visualFieldNotPerformed = [
  "Not clinically indicated",
  "Not available",
  "Patient unwilling/unable",
];
const cataractPresent = [
  "Not present",
  "Present but not visually",
  "Significant",
  "Visually significant",
];
const causeOfVisionLoss = [
  "Principally cataract",
  "principally glaucoma",
  "Mixed cataract and glaucoma",
  "Other",
];
const presentingVisualAcuity = [
  "6/5",
  "6/6",
  "6/9",
  "6/12",
  "6/18",
  "6/24",
  "6/36",
  "6/66",
  "CF",
  "HM",
  "LP",
  "NLP",
];

const getStageTwo = async (id) => {
  const res = await Axios.get("/user/stageTwo/" + id);
  return res.data;
};

const EyeSpecificForm = ({ nextStep, id }) => {
  const [initialValues, setInitialValues] = useState({});
  const curId = useSelector((state) => state.user.curId);
  if (id) {
    useEffect(() => {
      getStageTwo(id).then((res) => {
        setInitialValues(res);
      });
    }, []);
  } else {
    useEffect(() => {
      setInitialValues(initialValuesOut);
    }, []);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(saveStageTwo({ ...values, _id: id ? id : curId }));
    navigate("/edit_user/" + curId + "/3");
  };

  const onSave = (values) => {
    dispatch(saveStageTwo({ ...values, _id: id ? id : curId }));
    navigate("/");
  };
  return Object.keys(initialValues).length < 1 ? (
    <div className="flex h-screen w-full items-center justify-center">
      <Spin />
    </div>
  ) : (
    <div className="w-full md:my-[100px] mt-[100px] md:px-[100px] px-5">
      <h1 className="text-2xl font-bold mb-4 uppercase mt-5">
        Eye Spcific Data
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="whatEye" className="mb-2 font-bold">
                What eye
              </label>
              <Field
                as={"select"}
                type="text"
                id="whatEye"
                name="whatEye"
                placeholder="presenting Visual Acuity"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">What eye</option>
                {whatEye.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="whatEye"
                component="p"
                className="text-red-500"
              />
            </div>
            {(values.whatEye === "left" || values.whatEye === "both") && (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="presentingVisualAcuityL"
                    className="mb-2 font-bold"
                  >
                    Presenting Visual Acuity left eye
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="presentingVisualAcuityL"
                    name="presentingVisualAcuityL"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Presenting Visual Acuity Left</option>
                    {presentingVisualAcuity.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="presentingVisualAcuityL"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossL"
                    className="mb-2 font-bold"
                  >
                    Cause Of Vision Loss left
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="causeOfVisionLossL"
                    name="causeOfVisionLossL"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Cause Of Vision Loss left</option>
                    {causeOfVisionLoss.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="causeOfVisionLossL"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {values.causeOfVisionLossL === "Other" && (
                  <div className="flex flex-col">
                    <label htmlFor="number" className="mb-2 font-bold">
                      Cause Of Vision Loss Left
                    </label>
                    <Field
                      type="text"
                      id="causeOfVisionLossLO"
                      name="causeOfVisionLossLO"
                      placeholder="Cause Of Vision Loss Left"
                      className="border border-gray-400 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="text"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Cataract present Left
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="cataractPresentL"
                    name="cataractPresentL"
                    placeholder="Cataract present Left"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Cataract present Left</option>
                    {cataractPresent.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="cataractPresentL"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <Divider />
                <h3 className="text-lg font-bold mb-4 uppercase mt-5">
                  Procedure related Information
                </h3>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    How Many Shots were given Left
                  </label>
                  <Field
                    type="number"
                    id="noOfShotsL"
                    name="noOfShotsL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="noOfShotsL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    How Many Quadrants were treated Left
                  </label>
                  <Field
                    type="number"
                    id="noOfQuadrantsTreatedL"
                    name="noOfQuadrantsTreatedL"
                    placeholder="Enter a no Of Quadrants treated Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="noOfQuadrantsTreatedL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    What power was used Left
                  </label>
                  <Field
                    type="number"
                    id="powerUsedL"
                    name="powerUsedL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="powerUsedL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Any complications during procedure Left
                  </label>
                  <Field
                    type="number"
                    id="procedureComplicationL"
                    name="procedureComplicationL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="procedureComplicationL"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <Divider />

                <h3 className="text-lg font-bold mb-4 uppercase mt-5">
                  Post treatment Information
                </h3>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP BEFORE 1 Left
                  </label>
                  <Field
                    type="number"
                    id="IOP1L"
                    name="IOP1L"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1L"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP BEFORE 2 Left
                  </label>
                  <Field
                    type="number"
                    id="IOP2L"
                    name="IOP2L"
                    placeholder="Enter a no Of Quadrants treated Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP2L"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Mean Baseline IOP
                  </label>
                  <Field
                    type="number"
                    id="MIOPL"
                    name="MIOPL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="MIOPL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1HR)
                  </label>
                  <Field
                    type="number"
                    id="IOP1HRL"
                    name="IOP1HRL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1HRL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1DAY)
                  </label>
                  <Field
                    type="number"
                    id="IOP1DL"
                    name="IOP1DL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1DL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1M)
                  </label>
                  <Field
                    type="number"
                    id="IOP1ML"
                    name="IOP1ML"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1ML"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (3M)
                  </label>
                  <Field
                    type="number"
                    id="IOP3ML"
                    name="IOP3ML"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP3ML"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (6M)
                  </label>
                  <Field
                    type="number"
                    id="IOP6ML"
                    name="IOP6ML"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP6ML"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (9M)
                  </label>
                  <Field
                    type="number"
                    id="IOP9ML"
                    name="IOP9ML"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP9ML"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1Y)
                  </label>
                  <Field
                    type="number"
                    id="IOP1YL"
                    name="IOP1YL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1YL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (1HR)
                  </label>
                  <Field
                    type="number"
                    id="COM1HRL"
                    name="COM1HRL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM1HRL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (1D)
                  </label>
                  <Field
                    type="number"
                    id="COM1DL"
                    name="COM1DL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM1DL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (3M)
                  </label>
                  <Field
                    type="number"
                    id="COM3ML"
                    name="COM3ML"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM3ML"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (6M)
                  </label>
                  <Field
                    type="number"
                    id="COM6ML"
                    name="COM6ML"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM6ML"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (1Y)
                  </label>
                  <Field
                    type="number"
                    id="COM1YL"
                    name="COM1YL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM1YL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Central cornea thickness
                  </label>
                  <Field
                    type="number"
                    id="CCTL"
                    name="CCTL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="CCTL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="Ocular pain" className="mb-2 font-bold">
                    Ocular pain
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="ocularPainL"
                    name="ocularPainL"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Ocular pain Left</option>
                    {ocularPain.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="ocularPainL"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Ganioscopy
                  </label>
                  <Field
                    type="number"
                    id="ganioscopyL"
                    name="ganioscopyL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="ganioscopyL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Openness of the quadrant
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="openessOfQuadrantL"
                    name="openessOfQuadrantL"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value=""> Openness of the quadrant</option>
                    {openessOfQuadrant.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="openessOfQuadrantL"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Optic nerve visible
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="opticNerveVisibleL"
                    name="opticNerveVisibleL"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Optic nerve visible</option>
                    {opticNerveVisible.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="opticNerveVisibleL"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {values.opticNerveVisibleL === "yes" && (
                  <div className="flex flex-col">
                    <label htmlFor="number" className="mb-2 font-bold">
                      vertical Cup Disc Ratio
                    </label>
                    <Field
                      type="number"
                      id="verticalCupDiscRatioL"
                      name="verticalCupDiscRatioL"
                      placeholder="vertical cup disc Ratio"
                      className="border border-gray-400 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="verticalCupDiscRatioL"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Visual Field performed
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="visualFieldPerformedL"
                    name="visualFieldPerformedL"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Visual Field performed</option>
                    {visualFieldPerformed.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="visualFieldPerformedL"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {values.visualFieldPerformedL === "yes" && (
                  <>
                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Mean Deviation
                      </label>
                      <Field
                        type="number"
                        id="meanDeviationL"
                        name="meanDeviationL"
                        placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="meanDeviationL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Pattern Standard Deviation
                      </label>
                      <Field
                        type="number"
                        id="patternSDL"
                        name="patternSDL"
                        placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="patternSDL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Perimeter
                      </label>
                      <Field
                        type="number"
                        id="perimeterL"
                        name="perimeterL"
                        placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="perimeterL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </>
                )}

                {values.visualFieldPerformedL === "no" && (
                  <div className="flex flex-col">
                    <label
                      htmlFor="causeOfVisionLossR"
                      className="mb-2 font-bold"
                    >
                      Reason Visual not performed
                    </label>
                    <Field
                      as={"select"}
                      type="text"
                      id="visualFieldNotPerformedL"
                      name="visualFieldNotPerformedL"
                      placeholder="presenting Visual Acuity"
                      className="border border-gray-400 p-2 rounded-md"
                    >
                      <option value="">Ocular pain right</option>
                      {visualFieldNotPerformed.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="visualFieldNotPerformedL"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                )}
              </>
            )}

            {/* Right Group */}
            {(values.whatEye === "right" || values.whatEye === "both") && (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="presentingVisualAcuityR"
                    className="mb-2 font-bold"
                  >
                    Presenting Visual Acuity right eye
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="presentingVisualAcuityR"
                    name="presentingVisualAcuityR"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Presenting Visual Acuity right</option>
                    {presentingVisualAcuity.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="presentingVisualAcuityR"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Cause Of Vision Loss Right
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="causeOfVisionLossR"
                    name="causeOfVisionLossR"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Cause Of Vision Loss right</option>
                    {causeOfVisionLoss.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="causeOfVisionLossR"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {values.causeOfVisionLossR === "Other" && (
                  <div className="flex flex-col">
                    <label htmlFor="number" className="mb-2 font-bold">
                      Cause Of Vision Loss Right
                    </label>
                    <Field
                      type="text"
                      id="causeOfVisionLossRO"
                      name="causeOfVisionLossRO"
                      placeholder="Cause Of Vision Loss Right"
                      className="border border-gray-400 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="text"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Cataract present Right
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="cataractPresentR"
                    name="cataractPresentR"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Cataract present right</option>
                    {cataractPresent.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="cataractPresentR"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <Divider />
                <h3 className="text-lg font-bold mb-4 uppercase mt-5">
                  Procedure related Information
                </h3>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    How Many Shots were given Right
                  </label>
                  <Field
                    type="number"
                    id="noOfShotsR"
                    name="noOfShotsR"
                    placeholder="Enter a no Of Shots given Right"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="noOfShotsR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    How Many Quadrants were treated
                  </label>
                  <Field
                    type="number"
                    id="noOfQuadrantsTreatedR"
                    name="noOfQuadrantsTreatedR"
                    placeholder="Enter a no Of Quadrants treated Right"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="noOfQuadrantsTreatedR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    What power was used Right
                  </label>
                  <Field
                    type="number"
                    id="powerUsedR"
                    name="powerUsedR"
                    placeholder="Enter a no Of Shots given Right"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="powerUsedR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Any complications during procedure Right
                  </label>
                  <Field
                    type="number"
                    id="procedureComplicationR"
                    name="procedureComplicationR"
                    placeholder="Enter a no Of Shots given Right"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="procedureComplicationR"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <Divider />
                <h3 className="text-lg font-bold mb-4 uppercase mt-5">
                  Procedure related Information
                </h3>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    How Many Shots were given Left
                  </label>
                  <Field
                    type="number"
                    id="noOfShotsL"
                    name="noOfShotsL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="noOfShotsL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    How Many Quadrants were treated Left
                  </label>
                  <Field
                    type="number"
                    id="noOfQuadrantsTreatedL"
                    name="noOfQuadrantsTreatedL"
                    placeholder="Enter a no Of Quadrants treated Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="noOfQuadrantsTreatedL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    What power was used Left
                  </label>
                  <Field
                    type="number"
                    id="powerUsedL"
                    name="powerUsedL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="powerUsedL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Any complications during procedure Left
                  </label>
                  <Field
                    type="number"
                    id="procedureComplicationL"
                    name="procedureComplicationL"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="procedureComplicationL"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <Divider />
                <h3 className="text-lg font-bold mb-4 uppercase mt-5">
                  Post treatment Information
                </h3>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP BEFORE 1 Right
                  </label>
                  <Field
                    type="number"
                    id="IOP1R"
                    name="IOP1R"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1R"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP BEFORE 2 Left
                  </label>
                  <Field
                    type="number"
                    id="IOP2R"
                    name="IOP2R"
                    placeholder="Enter a no Of Quadrants treated Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP2R"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Mean Baseline IOP
                  </label>
                  <Field
                    type="number"
                    id="MIOPR"
                    name="MIOPR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="MIOPR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1HR)
                  </label>
                  <Field
                    type="number"
                    id="IOP1HRR"
                    name="IOP1HRR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1HRR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1DAY)
                  </label>
                  <Field
                    type="number"
                    id="IOP1DR"
                    name="IOP1DR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1DR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1M)
                  </label>
                  <Field
                    type="number"
                    id="IOP1MR"
                    name="IOP1MR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1MR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (3M)
                  </label>
                  <Field
                    type="number"
                    id="IOP3MR"
                    name="IOP3MR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP3MR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (6M)
                  </label>
                  <Field
                    type="number"
                    id="IOP6MR"
                    name="IOP6MR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP6MR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (9M)
                  </label>
                  <Field
                    type="number"
                    id="IOP9MR"
                    name="IOP9MR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP9MR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    IOP (1Y)
                  </label>
                  <Field
                    type="number"
                    id="IOP1YR"
                    name="IOP1YR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="IOP1YR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (1HR)
                  </label>
                  <Field
                    type="number"
                    id="COM1HRR"
                    name="COM1HRR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM1HRR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (1D)
                  </label>
                  <Field
                    type="number"
                    id="COM1DR"
                    name="COM1DR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM1DR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (3M)
                  </label>
                  <Field
                    type="number"
                    id="COM3MR"
                    name="COM3MR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM3MR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (6M)
                  </label>
                  <Field
                    type="number"
                    id="COM6MR"
                    name="COM6MR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM6MR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    COM (1Y)
                  </label>
                  <Field
                    type="number"
                    id="COM1YR"
                    name="COM1YR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="COM1YR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Central cornea thickness
                  </label>
                  <Field
                    type="number"
                    id="CCTR"
                    name="CCTR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="CCTR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Ocular pain
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="ocularPainR"
                    name="ocularPainR"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Ocular pain right</option>
                    {ocularPain.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="ocularPainR"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Ganioscopy
                  </label>
                  <Field
                    type="number"
                    id="ganioscopyR"
                    name="ganioscopyR"
                    placeholder="Enter a no Of Shots given Left"
                    className="border border-gray-400 p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="ganioscopyR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Openness of the quadrant
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="openessOfQuadrantR"
                    name="openessOfQuadrantR"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Ocular pain right</option>
                    {openessOfQuadrant.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="openessOfQuadrantR"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Optic nerve visible
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="opticNerveVisibleR"
                    name="opticNerveVisibleR"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Ocular pain right</option>
                    {opticNerveVisible.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="opticNerveVisibleR"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {values.opticNerveVisibleR === "yes" && (
                  <div className="flex flex-col">
                    <label htmlFor="number" className="mb-2 font-bold">
                      vertical Cup Disc Ratio
                    </label>
                    <Field
                      type="number"
                      id="verticalCupDiscRatioR"
                      name="verticalCupDiscRatioR"
                      placeholder="vertical cup disc Ratio"
                      className="border border-gray-400 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="verticalCupDiscRatioR"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <label
                    htmlFor="causeOfVisionLossR"
                    className="mb-2 font-bold"
                  >
                    Visual Field performed
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="visualFieldPerformedR"
                    name="visualFieldPerformedR"
                    placeholder="presenting Visual Acuity"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Visual Field performed</option>
                    {visualFieldPerformed.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="visualFieldPerformedR"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {values.visualFieldPerformedR === "yes" && (
                  <>
                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Mean Deviation
                      </label>
                      <Field
                        type="number"
                        id="meanDeviationR"
                        name="meanDeviationR"
                        placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="meanDeviationR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Pattern Standard Deviation
                      </label>
                      <Field
                        type="number"
                        id="patternSDR"
                        name="patternSDR"
                        placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="patternSDR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Perimeter
                      </label>
                      <Field
                        type="number"
                        id="perimeterR"
                        name="perimeterR"
                        placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="perimeterR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </>
                )}

                {values.visualFieldPerformedR === "no" && (
                  <div className="flex flex-col">
                    <label
                      htmlFor="causeOfVisionLossR"
                      className="mb-2 font-bold"
                    >
                      Reason Visual not performed
                    </label>
                    <Field
                      as={"select"}
                      type="text"
                      id="visualFieldNotPerformedR"
                      name="visualFieldNotPerformedR"
                      placeholder="presenting Visual Acuity"
                      className="border border-gray-400 p-2 rounded-md"
                    >
                      <option value="">Ocular pain right</option>
                      {visualFieldNotPerformed.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="visualFieldNotPerformedR"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                )}
              </>
            )}

            <div className="flex md:justify-end md:ml-auto w-full ">
              <div className="flex-col md:flex-row w-full">
                <div
                  onClick={() => onSave(values)}
                  className="cursor-pointer bg-green-600 text-white p-2 flex items-center justify-center mb-2 rounded-md w-full"
                  disabled={isSubmitting}
                >
                  Save
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white p-2 mb-2 rounded-md w-full  h-[50px] "
                  disabled={isSubmitting}
                >
                  Next
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* {formSubmitted && (
            <p className="text-green-500 mt-4">Form submitted successfully!</p>
          )} */}
    </div>
  );
};

export default memo(EyeSpecificForm);
