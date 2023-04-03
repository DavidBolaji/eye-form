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
  bestcorrectedvisualAquityLNaive: "", //new
  bestcorrectedvisualAquityLBeforeWashout: "", //new
  bestcorrectedvisualAquityLAfterWashout: "", //new
  bestcorrectedvisualAquityRNaive: "", //new
  bestcorrectedvisualAquityRBeforeWashout: "", //new
  bestcorrectedvisualAquityRAfterWshout: "", //new
  whatEyeChartWasUsedL: "", //text
  whatEyeChartWasUsedR: "", //text
  cataractPresentL: "",
  cataractPresentR: "",
  GonioscopyL: "",
  GonioscopyR: "",
  openessOfQuadrantL: "",
  openessOfQuadrantR: "",
  anteriorChemberActivityprioToProcedureL: "", // new text
  anteriorChemberActivityprioToProcedureR: "", // new text

  VCDRL: "",
  VCDRR: "",
  HCDRL: "",
  HCDRR: "",
  CVFL: "",
  CVFR: "",
  visualFieldPerformedL: "", // yes, No
  visualFieldPerformedR: "", // yes, No
  visualFieldNotPerformedL: "",
  visualFieldNotPerformedR: "",
  visualFieldNotPerformedLO: "",
  visualFieldNotPerformedRO: "",
  meanDeviationL: "",
  meanDeviationR: "",
  patternSDL: "",
  patternSDR: "",
  perimeterL: "",
  perimeterR: "",
  // end

  CCTL: "",
  CCTR: "",

  eyesToBeTreatedL: "", //dropdown, right, left, both
  eyesToBeTreatedR: "", //dropdown, right, left, both

  //change
  IOP1L: "", //IOPPrior
  IOP1R: "",
  IOP2L: "", // IOPBEFOREwASHOUT
  IOP2R: "",
  //NEW
  IOP3L: "", // IOPAfterwASHOUT
  IOP3R: "",

  //new
  IOP4L: "", // IOPAtRecruitment
  IOP4R: "",
  //nEW Position
  // interoccular pressre before procedure(Ihr before)
  IOP1HRL: "",
  IOP1HRR: "",

  BIOP: "",
  BIOPR: "",
  howmanymililetreofwaterwasgiven: "", // new
  howmanymililetreofwaterwasgivenR: "", // new
  iop5minL: "", //number
  iop5minR: "", //number
  iop15MinL: "",
  iop15MinR: "",
  iop30minL: "",
  iop30minR: "",
  iop1HRL: "",
  iop1HRR: "",
  averageEnergyForProcedureL: "", //Number
  averageEnergyForProcedureR: "", //Number

  noOfShotsL: "",
  noOfShotsR: "",
  powerUsedL: "",
  powerUsedR: "",
  noOfQuadrantsTreatedL: "",
  noOfQuadrantsTreatedR: "",
  procedureComplicationL: "",
  procedureComplicationR: "",

  ocularPainL: "",
  ocularPainR: "",

  // if yes show scale
  pain1hrL: "",
  pain1hrR: "",
  pain24hrL: "",
  pain24hrR: "",
  pain48hrL: "",
  pain48hrR: "",

  medicationsBeforeL: [],
  medicationsBeforeR: [],
  //   hobbies: [],
  vaUnaided1HRL: "",
  vaUnaided1HRR: "",

  bcVA1HRL: "",
  bcVA1HRR: "",

  flare1HRL: "",
  flare1HRR: "",

  cells1HRL: "",
  cells1HRR: "",

  LOCSG1HRR: "",
  LOCSG1HRL: "",

  IOPA1HRL: "",
  IOPA1HRR: "",

  comp1HRL: "",
  comp1HRR: "",

  BV1HRL: "",
  BV1HRR: "",

  //24HR
  vaUnaided24HRL: "",
  vaUnaided24HRR: "",

  bcVA24HRL: "",
  bcVA24HRR: "",

  flare24HRL: "",
  flare24HRR: "",

  cells24HRL: "",
  cells24HRR: "",

  LOCSG24HRR: "",
  LOCSG24HRL: "",

  IOPA24HRL: "",
  IOPA24HRR: "",

  comp24HRL: "",
  comp24HRR: "",

  //1MONTH
  vaUnaided1ML: "",
  vaUnaided1MR: "",

  bcVA1ML: "",
  bcVA1MR: "",

  flare1ML: "",
  flare1MR: "",

  cells1ML: "",
  cells1MR: "",

  LOCSG1MR: "",
  LOCSG1ML: "",

  IOPA1ML: "",
  IOPA1MR: "",

  comp1ML: "",
  comp1MR: "",

  //2MONTH
  vaUnaided2ML: "",
  vaUnaided2MR: "",

  bcVA2ML: "",
  bcVA2MR: "",

  flare2ML: "",
  flare2MR: "",

  cells2ML: "",
  cells2MR: "",

  LOCSG2MR: "",
  LOCSG2ML: "",

  IOPA2ML: "",
  IOPA2MR: "",

  PAS2ML: "",
  PAS2MR: "",

  pigment2ML: "",
  pigment2MR: "",

  pigmentO2ML: "",
  pigmentO2MR: "",

  SLT2ML: "",
  SLT2MR: "",

  BIOP2ML: "",
  BIOPR2MR: "",
  howmanymililetreofwaterwasgiven2ML: "", // new
  howmanymililetreofwaterwasgivenR2MR: "", // new
  iop5minL2ML: "", //number
  iop5minR2MR: "", //number
  iop15MinL2ML: "",
  iop15MinR2MR: "",
  iop30minL2ML: "",
  iop30minR2MR: "",
  iop1HRL2ML: "",
  iop1HRR2MR: "",

  //3MONTH
  vaUnaided3ML: "",
  vaUnaided3MR: "",

  bcVA3ML: "",
  bcVA3MR: "",

  flare3ML: "",
  flare3MR: "",

  cells3ML: "",
  cells3MR: "",

  LOCSG3MR: "",
  LOCSG3ML: "",

  IOPA3ML: "",
  IOPA3MR: "",

  PAS3ML: "",
  PAS3MR: "",

  pigment3ML: "",
  pigment3MR: "",

  pigmentO3ML: "",
  pigmentO3MR: "",

  SLT3ML: "",
  SLT3MR: "",

  //6MONTH
  vaUnaided6ML: "",
  vaUnaided6MR: "",

  bcVA6ML: "",
  bcVA6MR: "",

  flare6ML: "",
  flare6MR: "",

  cells6ML: "",
  cells6MR: "",

  LOCSG6MR: "",
  LOCSG6ML: "",

  IOPA6ML: "",
  IOPA6MR: "",

  PAS6ML: "",
  PAS6MR: "",

  pigment6ML: "",
  pigment6MR: "",

  pigmentO6ML: "",
  pigmentO6MR: "",

  SLT6ML: "",
  SLT6MR: "",

  CVFMD6ML: "",
  CVFMD6MR: "",

  PCVF6ML: "",
  PCVF6MR: "",

  CVFO6ML: "",
  CVFO6MR: "",

  CVFOO6ML: "",
  CVFOO6MR: "",

  //9 month
  vaUnaided9ML: "",
  vaUnaided9MR: "",

  bcVA9ML: "",
  bcVA9MR: "",

  flare9ML: "",
  flare9MR: "",

  cells9ML: "",
  cells9MR: "",

  LOCSG9MR: "",
  LOCSG9ML: "",

  IOPA9ML: "",
  IOPA9MR: "",

  // 12 MONTH

  vaUnaided12ML: "",
  vaUnaided12MR: "",

  bcVA12ML: "",
  bcVA12MR: "",

  flare12ML: "",
  flare12MR: "",

  cells12ML: "",
  cells12MR: "",

  LOCSG12MR: "",
  LOCSG12ML: "",

  IOPA12ML: "",
  IOPA12MR: "",

  CVFMD12ML: "",
  CVFMD12MR: "",

  PCVF12ML: "",
  PCVF12MR: "",

  CVFO12ML: "",
  CVFO12MR: "",

  CVFOO12ML: "",
  CVFOO12MR: "",

  CVFPS12ML: "",
  CVFPS12MR: "",
};

const medications = [
  "Prostaglandin",
  "Beta-Blocker",
  "CAI",
  "Alpha agonist",
  "MIOTIC",
  "Fixed combo",
];
const whatEye = ["left", "right", "both"];
const ocularPain = ["present", "absent"];
const openessOfQuadrant = ["open", "close", "narrow"];
const opticNerveVisible = ["yes", "no"];
const visualFieldPerformed = ["yes", "no"];
const visualFieldNotPerformed = [
  "Poor Vision",
  "Not Ccooperative",
  "Cannot afford it",
  "No Equipment available",
  "Others",
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
    // console.log(values._id);
    dispatch(saveStageTwo({ ...values, _id: values._id ? values._id : curId }));
    // navigate("/edit_user/" + values._id + "/3");
    nextStep();
  };

  const onSave = (values) => {
    dispatch(saveStageTwo({ ...values, _id: values._id }));
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
                // placeholder="presenting Visual Acuity"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value=""></option>
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
            <div className="flex gap-2 justify-between">
              <div className="w-1/2">
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
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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
                        htmlFor="bestcorrectedvisualAquityLNaive"
                        className="mb-2 font-bold"
                      >
                        Best Corrected Visual Acuity Naive left eye
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="bestcorrectedvisualAquityLNaive"
                        name="bestcorrectedvisualAquityLNaive"
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        {presentingVisualAcuity.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="bestcorrectedvisualAquityLNaive"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="bestcorrectedvisualAquityLBeforeWashout"
                        className="mb-2 font-bold"
                      >
                        Best Corrected Visual Acuity Before wash out left eye
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="bestcorrectedvisualAquityLBeforeWashout"
                        name="bestcorrectedvisualAquityLBeforeWashout"
                        // placeholder="Best Corrected Visual Acuity Before wash left eye"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        {presentingVisualAcuity.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="bestcorrectedvisualAquityLBeforeWashout"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="bestcorrectedvisualAquityLAfterWashout"
                        className="mb-2 font-bold"
                      >
                        Best Corrected Visual Acuity After wash out left eye
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="bestcorrectedvisualAquityLAfterWashout"
                        name="bestcorrectedvisualAquityLAfterWashout"
                        // placeholder="Best Corrected Visual Acuity After wash left eye"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        {presentingVisualAcuity.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="bestcorrectedvisualAquityLAfterWashout"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="whatEyeChartWasUsed"
                        className="mb-2 font-bold"
                      >
                        What eye chart was used
                      </label>
                      <Field
                        type="text"
                        id="whatEyeChartWasUsed"
                        name="whatEyeChartWasUsed"
                        // placeholder="What eye chart was useed"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="whatEyeChartWasUsed"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

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
                        // placeholder="Cataract present Left"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Gonioscopy
                      </label>
                      <Field
                        type="text"
                        id="GonioscopyL"
                        name="GonioscopyL"
                        // placeholder="Gonioscopy"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="GonioscopyL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="openessOfQuadrantL"
                        className="mb-2 font-bold"
                      >
                        Openness of the quadrant
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="openessOfQuadrantL"
                        name="openessOfQuadrantL"
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""> </option>
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
                        htmlFor="anteriorChemberActivityprioToProcedureL"
                        className="mb-2 font-bold"
                      >
                        Anterior Chember Activity prio To Procedure
                      </label>
                      <Field
                        type="text"
                        id="anteriorChemberActivityprioToProcedureL"
                        name="anteriorChemberActivityprioToProcedureL"
                        // placeholder="Best Corrected Visual Acuity After wash left eye"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="anteriorChemberActivityprioToProcedureL"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    {/* <div className="flex flex-col">
                      <label htmlFor="CDRL" className="mb-2 font-bold">
                        CDR(Baseline)
                      </label>
                      <Field
                        type="number"
                        id="CDRL"
                        name="CDRL"
                        // placeholder="CDR(Baseline)"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="CDRL"
                        component="p"
                        className="text-red-500"
                      />
                    </div> */}

                    <div className="flex flex-col">
                      <label htmlFor="VCDRL" className="mb-2 font-bold">
                        VCDR(Baseline)
                      </label>
                      <Field
                        type="number"
                        id="VCDRL"
                        name="VCDRL"
                        // placeholder="VCDR(Baseline)"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="VCDRL"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="HCDRL" className="mb-2 font-bold">
                        HCDR(Baseline)
                      </label>
                      <Field
                        type="number"
                        id="HCDRL"
                        name="HCDRL"
                        // placeholder="HCDR(Baseline)"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="HCDRL"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="CVFL" className="mb-2 font-bold">
                        CVF Recent before randomization
                      </label>
                      <Field
                        type="text"
                        id="CVFL"
                        name="CVFL"
                        // placeholder="CVF Recent before randomization"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="CVFL"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

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
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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
                            // placeholder="Enter a no Of Shots given Left"
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
                            // placeholder="Enter a no Of Shots given Left"
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
                            // placeholder="Enter a no Of Shots given Left"
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
                          // placeholder="Reason Visual not performed"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
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

                    {values.visualFieldNotPerformedL === "Others" && (
                      <div className="flex flex-col">
                        <label
                          htmlFor="visualFieldNotPerformedLO"
                          className="mb-2 font-bold"
                        >
                          Reason Visual not performed enter text
                        </label>
                        <Field
                          type="text"
                          id="visualFieldNotPerformedLO"
                          name="visualFieldNotPerformedLO"
                          // placeholder=" Reason Visual not performed enter text"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="visualFieldNotPerformedLO"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Central cornea thickness
                      </label>
                      <Field
                        type="number"
                        id="CCTL"
                        name="CCTL"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="CCTL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="eyesToBeTreated"
                        className="mb-2 font-bold"
                      >
                        Eye To Be Treated
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="eyesToBeTreatedL"
                        name="eyesToBeTreatedL"
                        // placeholder="Eye To Be Treated"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="both">Both</option>
                      </Field>
                      <ErrorMessage
                        name="eyesToBeTreatedL"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <Divider />

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        IOP Prior Left
                      </label>
                      <Field
                        type="number"
                        id="IOP1L"
                        name="IOP1L"
                        // placeholder="Enter a no Of Shots given Left"
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
                        IOP BEFORE washout Left
                      </label>
                      <Field
                        type="number"
                        id="IOP2L"
                        name="IOP2L"
                        // placeholder="IOP BEFORE washout Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP2L"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="IOP3L" className="mb-2 font-bold">
                        IOP After washout Left
                      </label>
                      <Field
                        type="number"
                        id="IOP3L"
                        name="IOP3L"
                        // placeholder="IOP After washout Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP3L"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="IOP4L" className="mb-2 font-bold">
                        IOP At Recruitment
                      </label>
                      <Field
                        type="number"
                        id="IOP4L"
                        name="IOP4L"
                        // placeholder="IOP At Recruitment"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP4L"
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
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP1HRL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="BIOP" className="mb-2 font-bold">
                        Water drinking test Baseline IOP
                      </label>
                      <Field
                        type="number"
                        id="BIOP"
                        name="BIOP"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="BIOP"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="howmanymililetreofwaterwasgiven"
                        className="mb-2 font-bold"
                      >
                        how many mililetre of water was given
                      </label>
                      <Field
                        type="number"
                        id="howmanymililetreofwaterwasgiven"
                        name="howmanymililetreofwaterwasgiven"
                        // placeholder="how many mililetre of water was given"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="howmanymililetreofwaterwasgiven"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop5minL" className="mb-2 font-bold">
                        IOP 5MIN
                      </label>
                      <Field
                        type="number"
                        id="iop5minL"
                        name="iop5minL"
                        // placeholder="how many mililetre of water was given"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop5minL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop15minL" className="mb-2 font-bold">
                        IOP 15MIN
                      </label>
                      <Field
                        type="number"
                        id="iop15minL"
                        name="iop15minL"
                        // placeholder="IOP 15MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop15minL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop30minL" className="mb-2 font-bold">
                        IOP 30MIN
                      </label>
                      <Field
                        type="number"
                        id="iop30minL"
                        name="iop30minL"
                        // placeholder="IOP 30MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop30minL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop1HRL" className="mb-2 font-bold">
                        IOP 1HR
                      </label>
                      <Field
                        type="number"
                        id="iop1HRL"
                        name="iop1HRL"
                        // placeholder="IOP 1HR"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop1HRL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="averageEnergyForProcedureL"
                        className="mb-2 font-bold"
                      >
                        Average Energy For Procedure
                      </label>
                      <Field
                        type="number"
                        id="averageEnergyForProcedureL"
                        name="averageEnergyForProcedureL"
                        // placeholder="Average Energy For Procedure"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="averageEnergyForProcedureL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <Divider />

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        How Many Shots were given Left
                      </label>
                      <Field
                        type="number"
                        id="noOfShotsL"
                        name="noOfShotsL"
                        // placeholder="Enter a no Of Shots given Left"
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
                        What power was used Left
                      </label>
                      <Field
                        type="number"
                        id="powerUsedL"
                        name="powerUsedL"
                        // placeholder="Enter a no Of Shots given Left"
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
                        How Many Quadrants were treated Left
                      </label>
                      <Field
                        type="number"
                        id="noOfQuadrantsTreatedL"
                        name="noOfQuadrantsTreatedL"
                        // placeholder="Enter a no Of Quadrants treated Left"
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
                        Any complications during procedure Left
                      </label>
                      <Field
                        type="number"
                        id="procedureComplicationL"
                        name="procedureComplicationL"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="procedureComplicationL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <Divider />

                    <div className="flex flex-col">
                      <label htmlFor="Ocular pain" className="mb-2 font-bold">
                        Ocular pain
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="ocularPainL"
                        name="ocularPainL"
                        // placeholder="Ocular pain"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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

                    {values.ocularPainL === "present" && (
                      <>
                        <div className="flex flex-col">
                          <label htmlFor="pain1hrL" className="mb-2 font-bold">
                            Level of pain 1HR
                          </label>
                          <Field
                            type="number"
                            id="pain1hrL"
                            name="pain1hrL"
                            // placeholder="Level of pain 1HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain1hrL"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain24hrL" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain24hrL"
                            name="pain24hrL"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain24hrL"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain48hrL" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain48hrL"
                            name="pain48hrL"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain48hrL"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="medicationsBeforeL"
                        className="mb-2 font-bold"
                      >
                        Medications(select all that apply)
                      </label>
                      <Field
                        as={"select"}
                        multiple
                        id="medicationsBeforeL"
                        name="medicationsBeforeL"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        {medications.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="medicationsBeforeL"
                        component="p"
                        className="text-red-500"
                      />
                    </div>
                    <Divider />
                    {/* 1hr */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 1hr</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided1HRR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1HRR"
                          name="vaUnaided1HRR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1HRR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1HRR"
                          name="bcVA1HRR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1HRR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1HRR"
                          name="flare1HRR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1HRR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1HRR"
                          name="cells1HRR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG1HRR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG1HRR"
                          name="LOCSG1HRR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1HRR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1HRR"
                          name="IOPA1HRR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1HRR" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1HRR"
                          name="comp1HRR"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="BV1HRR" className="mb-2 font-bold">
                          Bluring of vision
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="BV1HRR"
                          name="BV1HRR"
                          // placeholder="SLT"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="BV1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 24HR */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 24HR</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided24HRL"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided24HRL"
                          name="vaUnaided24HRL"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided24HRL"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA24HRL" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA24HRL"
                          name="bcVA24HRL"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA24HRL"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare24HRL" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare24HRL"
                          name="flare24HRL"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare24HRL"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells24HRL" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells24HRL"
                          name="cells24HRL"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells24HRL"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG24HRL" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG24HRL"
                          name="LOCSG24HRL"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG24HRL"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA24HRL" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA24HRL"
                          name="IOPA24HRL"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA24HRL"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp24HRL" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp24HRL"
                          name="comp24HRL"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp24HRL"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    {/* <Divider /> */}

                    {/* 1M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 1 Month</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided1ML"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1ML"
                          name="vaUnaided1ML"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided1ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1ML" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1ML"
                          name="bcVA1ML"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA1ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1ML" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1ML"
                          name="flare1ML"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1ML" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1ML"
                          name="cells1ML"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG1ML" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG1ML"
                          name="LOCSG1ML"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG1ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1ML" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1ML"
                          name="IOPA1ML"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1ML" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1ML"
                          name="comp1ML"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 2M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 2 Month</h3>
                      <Divider />
                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided2ML"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided2ML"
                          name="vaUnaided2ML"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA2ML" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA2ML"
                          name="bcVA2ML"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare2ML" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare2ML"
                          name="flare2ML"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells2ML" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells2ML"
                          name="cells2ML"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG2ML" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG2ML"
                          name="LOCSG2ML"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA2ML" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA2ML"
                          name="IOPA2ML"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Gonioscopy
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="PAS2ML" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS2ML"
                          name="PAS2ML"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment2ML" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment2ML"
                          name="pigment2ML"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO2ML" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO2ML"
                          name="pigmentO2ML"
                          // placeholder="Others"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT2ML" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT2ML"
                          name="SLT2ML"
                          // placeholder="SLT"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                          <option value="IOP reduced post SLT but needs either repeat SLT OR medication">
                            IOP reduced post SLT but needs either repeat SLT OR
                            medication
                          </option>
                          <option value="other assesement">
                            other assesement
                          </option>
                        </Field>
                        <ErrorMessage
                          name="SLT2ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Water Drinking
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="BIOP2ML" className="mb-2 font-bold">
                          Water drinking test Baseline IOP
                        </label>
                        <Field
                          type="number"
                          id="BIOP2ML"
                          name="BIOP2ML"
                          // placeholder="Enter a no Of Shots given Left"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="BIOP2ML"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="howmanymililetreofwaterwasgiven2ML"
                          className="mb-2 font-bold"
                        >
                          how many mililetre of water was given
                        </label>
                        <Field
                          type="number"
                          id="howmanymililetreofwaterwasgiven2ML"
                          name="howmanymililetreofwaterwasgiven2ML"
                          // placeholder="how many mililetre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="howmanymililetreofwaterwasgiven2ML"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="iop5minL2ML" className="mb-2 font-bold">
                          IOP 5MIN
                        </label>
                        <Field
                          type="number"
                          id="iop5minL2ML"
                          name="iop5minL2ML"
                          // placeholder="how many mililetre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop5minL2ML"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop15minL2ML"
                          className="mb-2 font-bold"
                        >
                          IOP 15MIN
                        </label>
                        <Field
                          type="number"
                          id="iop15minL2ML"
                          name="iop15minL2ML"
                          // placeholder="IOP 15MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop15minL2ML"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop30minL2ML"
                          className="mb-2 font-bold"
                        >
                          IOP 30MIN
                        </label>
                        <Field
                          type="number"
                          id="iop30minL2ML"
                          name="iop30minL2ML"
                          // placeholder="IOP 30MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop30minL2ML"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="iop1HRL2ML" className="mb-2 font-bold">
                          IOP 1HR
                        </label>
                        <Field
                          type="number"
                          id="iop1HRL2ML"
                          name="iop1HRL2ML"
                          // placeholder="IOP 1HR"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop1HRL2ML"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 3M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 3 Month</h3>
                      <Divider />
                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided3ML"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided3ML"
                          name="vaUnaided3ML"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA3ML" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA3ML"
                          name="bcVA3ML"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare3ML" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare3ML"
                          name="flare3ML"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells3ML" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells3ML"
                          name="cells3ML"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG3ML" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG3ML"
                          name="LOCSG3ML"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA3ML" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA3ML"
                          name="IOPA3ML"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Gonioscopy
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="PAS3ML" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS3ML"
                          name="PAS3ML"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment3ML" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment3ML"
                          name="pigment3ML"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO3ML" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO3ML"
                          name="pigmentO3ML"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT3ML" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT3ML"
                          name="SLT3ML"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                          <option value="IOP reduced post SLT but needs either repeat SLT OR medication">
                            IOP reduced post SLT but needs either repeat SLT OR
                            medication
                          </option>
                          <option value="other assesement">
                            other assesement
                          </option>
                        </Field>
                        <ErrorMessage
                          name="SLT3ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 6M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 6 M</h3>
                      <Divider />
                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided6ML"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided6ML"
                          name="vaUnaided6ML"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA6ML" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA6ML"
                          name="bcVA6ML"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare6ML" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare6ML"
                          name="flare6ML"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells6ML" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells6ML"
                          name="cells6ML"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG6ML" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG6ML"
                          name="LOCSG6ML"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA6ML" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA6ML"
                          name="IOPA6ML"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Gonioscopy
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="PAS6ML" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS6ML"
                          name="PAS6ML"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment6ML" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment6ML"
                          name="pigment6ML"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO6ML" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO6ML"
                          name="pigmentO6ML"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT6ML" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT6ML"
                          name="SLT6ML"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                          <option value="IOP reduced post SLT but needs either repeat SLT OR medication">
                            IOP reduced post SLT but needs either repeat SLT OR
                            medication
                          </option>
                          <option value="other assesement">
                            other assesement
                          </option>
                        </Field>
                        <ErrorMessage
                          name="SLT6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="CVFMD6ML" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD6ML"
                          name="CVFMD6ML"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PCVF6ML" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF6ML"
                          name="PCVF6ML"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF6ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      {values.PCVF6ML === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label htmlFor="CVFO6ML" className="mb-2 font-bold">
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO6ML"
                              name="CVFO6ML"
                              // placeholder="select progression"
                              className="border border-gray-400 p-3 rounded-md"
                            >
                              <option value=""></option>
                              <option value="widening">widening</option>
                              <option value="Deepening of scotomas">
                                Deepening of scotomas
                              </option>
                              <option value="higher MD">higher MD</option>
                              <option value="others">others</option>
                            </Field>
                            <ErrorMessage
                              name="CVFO6ML"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                      {values.CVFO6ML === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO6ML"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO6ML"
                              name="CVFOO6ML"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO6ML"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* 9M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 9 Months</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided9ML"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided9ML"
                          name="vaUnaided9ML"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided9ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA9ML" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA9ML"
                          name="bcVA9ML"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA9ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare9ML" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare9ML"
                          name="flare9ML"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare9ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells9ML" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells9ML"
                          name="cells9ML"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells9ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG9ML" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG9ML"
                          name="LOCSG9ML"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG9ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA9ML" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA9ML"
                          name="IOPA9ML"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA9ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 12M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 12 M</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided12ML"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided12ML"
                          name="vaUnaided12ML"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA12ML" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA12ML"
                          name="bcVA12ML"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare12ML" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare12ML"
                          name="flare12ML"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells12ML" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells12ML"
                          name="cells12ML"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG12ML" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG12ML"
                          name="LOCSG12ML"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA12ML" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA12ML"
                          name="IOPA12ML"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFMD12ML" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD12ML"
                          name="CVFMD12ML"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFPS12ML" className="mb-2 font-bold">
                          CVF Pattern standard
                        </label>
                        <Field
                          type="number"
                          id="CVFPS12ML"
                          name="CVFPS12ML"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFPS12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="PCVF12ML" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF12ML"
                          name="PCVF12ML"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF12ML"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      {values.PCVF12ML === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFO12ML"
                              className="mb-2 font-bold"
                            >
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO12ML"
                              name="CVFO12ML"
                              // placeholder="select progression"
                              className="border border-gray-400 p-3 rounded-md"
                            >
                              <option value=""></option>
                              <option value="widening">widening</option>
                              <option value="Deepening of scotomas">
                                Deepening of scotomas
                              </option>
                              <option value="higher MD">higher MD</option>
                              <option value="others">others</option>
                            </Field>
                            <ErrorMessage
                              name="CVFO12ML"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}

                      {values.CVFO12ML === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO12ML"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO12ML"
                              name="CVFOO12ML"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO12ML"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Right Group */}
              <div className="w-1/2">
                {(values.whatEye === "right" || values.whatEye === "both") && (
                  <>
                    <div className="flex flex-col">
                      <label
                        htmlFor="presentingVisualAcuityR"
                        className="mb-2 font-bold"
                      >
                        Presenting Visual Acuity Right eye
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="presentingVisualAcuityR"
                        name="presentingVisualAcuityR"
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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
                        htmlFor="bestcorrectedvisualAquityRNaive"
                        className="mb-2 font-bold"
                      >
                        Best Corrected Visual Acuity Naive Right eye
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="bestcorrectedvisualAquityRNaive"
                        name="bestcorrectedvisualAquityRNaive"
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        {presentingVisualAcuity.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="bestcorrectedvisualAquityRNaive"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="bestcorrectedvisualAquityRBeforeWashout"
                        className="mb-2 font-bold"
                      >
                        Best Corrected Visual Acuity Before wash out Right eye
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="bestcorrectedvisualAquityRBeforeWashout"
                        name="bestcorrectedvisualAquityRBeforeWashout"
                        // placeholder="Best Corrected Visual Acuity Before wash Right eye"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        {presentingVisualAcuity.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="bestcorrectedvisualAquityRBeforeWashout"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="bestcorrectedvisualAquityRAfterWshout"
                        className="mb-2 font-bold"
                      >
                        Best Corrected Visual Acuity After wash out Right eye
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="bestcorrectedvisualAquityRAfterWshout"
                        name="bestcorrectedvisualAquityRAfterWshout"
                        // placeholder="Best Corrected Visual Acuity After wash Right eye"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        {presentingVisualAcuity.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="bestcorrectedvisualAquityRAfterWshout"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="whatEyeChartWasUsedR"
                        className="mb-2 font-bold"
                      >
                        What eye chart was used
                      </label>
                      <Field
                        type="text"
                        id="whatEyeChartWasUsedR"
                        name="whatEyeChartWasUsedR"
                        // placeholder="What eye chart was useed"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="whatEyeChartWasUsedR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="cataractPresentR"
                        className="mb-2 font-bold"
                      >
                        Cataract present Right
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="cataractPresentR"
                        name="cataractPresentR"
                        // placeholder="Cataract present Right"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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

                    <div className="flex flex-col">
                      <label htmlFor="GonioscopyR" className="mb-2 font-bold">
                        Gonioscopy
                      </label>
                      <Field
                        type="text"
                        id="GonioscopyR"
                        name="GonioscopyR"
                        // placeholder="Gonioscopy"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="GonioscopyR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="openessOfQuadrantR"
                        className="mb-2 font-bold"
                      >
                        Openness of the quadrant
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="openessOfQuadrantR"
                        name="openessOfQuadrantR"
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""> </option>
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
                        htmlFor="anteriorChemberActivityprioToProcedureR"
                        className="mb-2 font-bold"
                      >
                        Anterior Chember Activity prio To Procedure
                      </label>
                      <Field
                        type="text"
                        id="anteriorChemberActivityprioToProcedureR"
                        name="anteriorChemberActivityprioToProcedureR"
                        // placeholder="Best Corrected Visual Acuity After wash left eye"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="anteriorChemberActivityprioToProcedureR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    {/* <div className="flex flex-col">
                      <label htmlFor="CDRR" className="mb-2 font-bold">
                        CDR(Baseline)
                      </label>
                      <Field
                        type="number"
                        id="CDRR"
                        name="CDRR"
                        // placeholder="CDR(Baseline)"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="CDRR"
                        component="p"
                        className="text-red-500"
                      />
                    </div> */}

                    <div className="flex flex-col">
                      <label htmlFor="VCDRR" className="mb-2 font-bold">
                        VCDR(Baseline)
                      </label>
                      <Field
                        type="number"
                        id="VCDRR"
                        name="VCDRR"
                        // placeholder="VCDR(Baseline)"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="VCDRR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="HCDRR" className="mb-2 font-bold">
                        HCDR(Baseline)
                      </label>
                      <Field
                        type="number"
                        id="HCDRR"
                        name="HCDRR"
                        // placeholder="HCDR(Baseline)"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="HCDRR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="CVFR" className="mb-2 font-bold">
                        CVF Recent before randomization
                      </label>
                      <Field
                        type="text"
                        id="CVFR"
                        name="CVFR"
                        // placeholder="CVF Recent before randomization"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="CVFR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="visualFieldPerformedR"
                        className="mb-2 font-bold"
                      >
                        Visual Field performed
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="visualFieldPerformedR"
                        name="visualFieldPerformedR"
                        // placeholder="presenting Visual Acuity"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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
                          <label
                            htmlFor="meanDeviationR"
                            className="mb-2 font-bold"
                          >
                            Mean Deviation
                          </label>
                          <Field
                            type="number"
                            id="meanDeviationR"
                            name="meanDeviationR"
                            // placeholder="Enter a no Of Shots given Left"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="meanDeviationR"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="patternSDR"
                            className="mb-2 font-bold"
                          >
                            Pattern Standard Deviation
                          </label>
                          <Field
                            type="number"
                            id="patternSDR"
                            name="patternSDR"
                            // placeholder="Enter a no Of Shots given Left"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="patternSDR"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="perimeterR"
                            className="mb-2 font-bold"
                          >
                            Perimeter
                          </label>
                          <Field
                            type="number"
                            id="perimeterR"
                            name="perimeterR"
                            // placeholder="Enter a no Of Shots given Left"
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
                          // placeholder=" Reason Visual not performed"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
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

                    {values.visualFieldNotPerformedR === "Others" && (
                      <div className="flex flex-col">
                        <label
                          htmlFor="visualFieldNotPerformedRO"
                          className="mb-2 font-bold"
                        >
                          Reason Visual not performed enter text
                        </label>
                        <Field
                          type="text"
                          id="visualFieldNotPerformedRO"
                          name="visualFieldNotPerformedRO"
                          // placeholder="Reason Visual not performed enter text"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="visualFieldNotPerformedRO"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <label htmlFor="CCTR" className="mb-2 font-bold">
                        Central cornea thickness
                      </label>
                      <Field
                        type="number"
                        id="CCTR"
                        name="CCTR"
                        // placeholder="Enter a no Of Shots given Right"
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
                        htmlFor="eyesToBeTreatedR"
                        className="mb-2 font-bold"
                      >
                        Eye To Be Treated
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="eyesToBeTreatedR"
                        name="eyesToBeTreatedR"
                        // placeholder="Eye To Be Treated"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="both">Both</option>
                      </Field>
                      <ErrorMessage
                        name="eyesToBeTreatedR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <Divider />

                    <div className="flex flex-col">
                      <label htmlFor="IOP1R" className="mb-2 font-bold">
                        IOP Prior Left
                      </label>
                      <Field
                        type="number"
                        id="IOP1R"
                        name="IOP1R"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP1R"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="IOP2R" className="mb-2 font-bold">
                        IOP BEFORE washout Right
                      </label>
                      <Field
                        type="number"
                        id="IOP2R"
                        name="IOP2R"
                        // placeholder="IOP BEFORE washout Right"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP2R"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="IOP3R" className="mb-2 font-bold">
                        IOP After washout Right
                      </label>
                      <Field
                        type="number"
                        id="IOP3R"
                        name="IOP3R"
                        // placeholder="IOP After washout Right"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP3R"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="IOP4R" className="mb-2 font-bold">
                        IOP At Recruitment
                      </label>
                      <Field
                        type="number"
                        id="IOP4R"
                        name="IOP4R"
                        // placeholder="IOP At Recruitment"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP4R"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="IOP1HRR" className="mb-2 font-bold">
                        IOP (1HR)
                      </label>
                      <Field
                        type="number"
                        id="IOP1HRR"
                        name="IOP1HRR"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="IOP1HRR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="BIOPR" className="mb-2 font-bold">
                        Water drinking test Baseline IOP
                      </label>
                      <Field
                        type="number"
                        id="BIOPRR"
                        name="BIOPR"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="BIOPR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="howmanymililetreofwaterwasgivenR"
                        className="mb-2 font-bold"
                      >
                        how many mililetre of water was given
                      </label>
                      <Field
                        type="number"
                        id="howmanymililetreofwaterwasgivenR"
                        name="howmanymililetreofwaterwasgivenR"
                        // placeholder="how many mililetre of water was given"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="howmanymililetreofwaterwasgivenR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop5minR" className="mb-2 font-bold">
                        IOP 5MIN
                      </label>
                      <Field
                        type="number"
                        id="iop5minR"
                        name="iop5minR"
                        // placeholder="how many mililetre of water was given"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop5minR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop15minR" className="mb-2 font-bold">
                        IOP 15MIN
                      </label>
                      <Field
                        type="number"
                        id="iop15minR"
                        name="iop15minR"
                        // placeholder="IOP 15MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop15minR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop30minR" className="mb-2 font-bold">
                        IOP 30MIN
                      </label>
                      <Field
                        type="number"
                        id="iop30minR"
                        name="iop30minR"
                        // placeholder="IOP 30MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop30minR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop1HRR" className="mb-2 font-bold">
                        IOP 1HR
                      </label>
                      <Field
                        type="number"
                        id="iop1HRR"
                        name="iop1HRR"
                        // placeholder="IOP 1HR"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop1HRR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="averageEnergyForProcedureR"
                        className="mb-2 font-bold"
                      >
                        Average Energy For Procedure
                      </label>
                      <Field
                        type="number"
                        id="averageEnergyForProcedureR"
                        name="averageEnergyForProcedureR"
                        // placeholder="Average Energy For Procedure"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="averageEnergyForProcedureR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <Divider />

                    <div className="flex flex-col">
                      <label htmlFor="noOfShotsR" className="mb-2 font-bold">
                        How Many Shots were given Right
                      </label>
                      <Field
                        type="number"
                        id="noOfShotsR"
                        name="noOfShotsR"
                        // placeholder="Enter a no Of Shots given Right"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="noOfShotsR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="powerUsedR" className="mb-2 font-bold">
                        What power was used Right
                      </label>
                      <Field
                        type="number"
                        id="powerUsedR"
                        name="powerUsedR"
                        // placeholder="Enter a no Of Shots given Left"
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
                        How Many Quadrants were treated Right
                      </label>
                      <Field
                        type="number"
                        id="noOfQuadrantsTreatedR"
                        name="noOfQuadrantsTreatedR"
                        // placeholder="Enter a no Of Quadrants treated Left"
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
                        Any complications during procedure Right
                      </label>
                      <Field
                        type="number"
                        id="procedureComplicationR"
                        name="procedureComplicationR"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="procedureComplicationR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <Divider />

                    <div className="flex flex-col">
                      <label htmlFor="Ocular pain" className="mb-2 font-bold">
                        Ocular pain
                      </label>
                      <Field
                        as={"select"}
                        type="text"
                        id="ocularPainR"
                        name="ocularPainR"
                        // placeholder="Ocular pain"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value=""></option>
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

                    {values.ocularPainR === "present" && (
                      <>
                        <div className="flex flex-col">
                          <label htmlFor="pain1hrR" className="mb-2 font-bold">
                            Level of pain 1HR
                          </label>
                          <Field
                            type="number"
                            id="pain1hrR"
                            name="pain1hrR"
                            // placeholder="Level of pain 1HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain1hrR"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain24hrR" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain24hrR"
                            name="pain24hrR"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain24hrR"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain48hrR" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain48hrR"
                            name="pain48hrR"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain48hrR"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="medicationsBeforeR"
                        className="mb-2 font-bold"
                      >
                        Medications(select all that apply)
                      </label>
                      <Field
                        as={"select"}
                        multiple
                        id="medicationsBeforeR"
                        name="medicationsBeforeR"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        {medications.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="medicationsBeforeR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <Divider />

                    {/* 1hr */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 1hr</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided1HRR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1HRR"
                          name="vaUnaided1HRR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1HRR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1HRR"
                          name="bcVA1HRR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1HRR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1HRR"
                          name="flare1HRR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1HRR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1HRR"
                          name="cells1HRR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG1HRR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG1HRR"
                          name="LOCSG1HRR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1HRR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1HRR"
                          name="IOPA1HRR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1HRR" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1HRR"
                          name="comp1HRR"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="BV1HRR" className="mb-2 font-bold">
                          Bluring of vision
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="BV1HRR"
                          name="BV1HRR"
                          // placeholder="SLT"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="BV1HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 24HR */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 24HR</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided24HRR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided24HRR"
                          name="vaUnaided24HRR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided24HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA24HRR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA24HRR"
                          name="bcVA24HRR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA24HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare24HRR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare24HRR"
                          name="flare24HRR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare24HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells24HRR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells24HRR"
                          name="cells24HRR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells24HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG24HRR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG24HRR"
                          name="LOCSG24HRR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG24HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA24HRR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA24HRR"
                          name="IOPA24HRR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA24HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp24HRR" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp24HRR"
                          name="comp24HRR"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp24HRR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 1M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 1 Month</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided1MR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1MR"
                          name="vaUnaided1MR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided1MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1MR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1MR"
                          name="bcVA1MR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA1MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1MR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1MR"
                          name="flare1MR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1MR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1MR"
                          name="cells1MR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG1MR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG1MR"
                          name="LOCSG1MR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG1MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1MR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1MR"
                          name="IOPA1MR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1MR" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1MR"
                          name="comp1MR"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 2M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 2 Month</h3>
                      <Divider />
                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided2MR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided2MR"
                          name="vaUnaided2MR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA2MR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA2MR"
                          name="bcVA2MR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare2MR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare2MR"
                          name="flare2MR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells2MR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells2MR"
                          name="cells2MR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG2MR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG2MR"
                          name="LOCSG2MR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA2MR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA2MR"
                          name="IOPA2MR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Gonioscopy
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="PAS2MR" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS2MR"
                          name="PAS2MR"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment2MR" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment2MR"
                          name="pigment2MR"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO2MR" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO2MR"
                          name="pigmentO2MR"
                          // placeholder="Others"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT2MR" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT2MR"
                          name="SLT2MR"
                          // placeholder="SLT"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                          <option value="IOP reduced post SLT but needs either repeat SLT OR medication">
                            IOP reduced post SLT but needs either repeat SLT OR
                            medication
                          </option>
                          <option value="other assesement">
                            other assesement
                          </option>
                        </Field>
                        <ErrorMessage
                          name="SLT2MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Water Drinking
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="BIOPR2MR" className="mb-2 font-bold">
                          Water drinking test Baseline IOP
                        </label>
                        <Field
                          type="number"
                          id="BIOPR2MR"
                          name="BIOPR2MR"
                          // placeholder="Enter a no Of Shots given Left"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="BIOPR2MR"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="howmanymililetreofwaterwasgivenR2MR"
                          className="mb-2 font-bold"
                        >
                          how many mililetre of water was given
                        </label>
                        <Field
                          type="number"
                          id="howmanymililetreofwaterwasgivenR2MR"
                          name="howmanymililetreofwaterwasgivenR2MR"
                          // placeholder="how many mililetre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="howmanymililetreofwaterwasgivenR2MR"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="iop5minR2MR" className="mb-2 font-bold">
                          IOP 5MIN
                        </label>
                        <Field
                          type="number"
                          id="iop5minR2MR"
                          name="iop5minR2MR"
                          // placeholder="how many mililetre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop5minR2MR"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop15MinR2MR"
                          className="mb-2 font-bold"
                        >
                          IOP 15MIN
                        </label>
                        <Field
                          type="number"
                          id="iop15MinR2MR"
                          name="iop15MinR2MR"
                          // placeholder="IOP 15MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop15MinR2MR"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop30minR2MR"
                          className="mb-2 font-bold"
                        >
                          IOP 30MIN
                        </label>
                        <Field
                          type="number"
                          id="iop30minR2MR"
                          name="iop30minR2MR"
                          // placeholder="IOP 30MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop30minR2MR"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="iop1HRR2MR" className="mb-2 font-bold">
                          IOP 1HR
                        </label>
                        <Field
                          type="number"
                          id="iop1HRR2MR"
                          name="iop1HRR2MR"
                          // placeholder="IOP 1HR"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop1HRR2MR"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 3M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 3 Month</h3>
                      <Divider />
                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided3MR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided3MR"
                          name="vaUnaided3MR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA3MR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA3MR"
                          name="bcVA3MR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare3MR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare3MR"
                          name="flare3MR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells3MR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells3MR"
                          name="cells3MR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG3MR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG3MR"
                          name="LOCSG3MR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA3MR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA3MR"
                          name="IOPA3MR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Gonioscopy
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="PAS3MR" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS3MR"
                          name="PAS3MR"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment3MR" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment3MR"
                          name="pigment3MR"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO3MR" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO3MR"
                          name="pigmentO3MR"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT3MR" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT3MR"
                          name="SLT3MR"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                          <option value="IOP reduced post SLT but needs either repeat SLT OR medication">
                            IOP reduced post SLT but needs either repeat SLT OR
                            medication
                          </option>
                          <option value="other assesement">
                            other assesement
                          </option>
                        </Field>
                        <ErrorMessage
                          name="SLT3MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 6M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 6 M</h3>
                      <Divider />
                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided6MR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided6MR"
                          name="vaUnaided6MR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA6MR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA6MR"
                          name="bcVA6MR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare6MR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare6MR"
                          name="flare6MR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells6MR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells6MR"
                          name="cells6MR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG6MR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG6MR"
                          name="LOCSG6MR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA6MR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA6MR"
                          name="IOPA6MR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Gonioscopy
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="PAS6MR" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS6MR"
                          name="PAS6MR"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment6MR" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment6MR"
                          name="pigment6MR"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO6MR" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO6MR"
                          name="pigmentO6MR"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT6MR" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT6MR"
                          name="SLT6MR"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                          <option value="IOP reduced post SLT but needs either repeat SLT OR medication">
                            IOP reduced post SLT but needs either repeat SLT OR
                            medication
                          </option>
                          <option value="other assesement">
                            other assesement
                          </option>
                        </Field>
                        <ErrorMessage
                          name="SLT6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="CVFMD6MR" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD6MR"
                          name="CVFMD6MR"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PCVF6MR" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF6MR"
                          name="PCVF6MR"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF6MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      {values.PCVF6MR === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label htmlFor="CVFO6MR" className="mb-2 font-bold">
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO6MR"
                              name="CVFO6MR"
                              // placeholder="select progression"
                              className="border border-gray-400 p-3 rounded-md"
                            >
                              <option value=""></option>
                              <option value="widening">widening</option>
                              <option value="Deepening of scotomas">
                                Deepening of scotomas
                              </option>
                              <option value="higher MD">higher MD</option>
                              <option value="others">others</option>
                            </Field>
                            <ErrorMessage
                              name="CVFO6MR"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                      {values.CVFO6MR === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO6MR"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO6MR"
                              name="CVFOO6MR"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO6MR"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* 9M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 9 Months</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided9MR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided9MR"
                          name="vaUnaided9MR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided9MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA9MR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA9MR"
                          name="bcVA9MR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA9MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare9MR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare9MR"
                          name="flare9MR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare9MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells9MR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells9MR"
                          name="cells9MR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells9MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG9MR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG9MR"
                          name="LOCSG9MR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG9MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA9MR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA9MR"
                          name="IOPA9MR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA9MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* 12M */}
                    <div>
                      <Divider />
                      <h3>Examination of eye at 12 M</h3>

                      <Divider />

                      <div className="flex flex-col">
                        <label
                          htmlFor="vaUnaided12MR"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided12MR"
                          name="vaUnaided12MR"
                          // placeholder="Visual Acuity unaided"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="vaUnaided12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA12MR" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA12MR"
                          name="bcVA12MR"
                          // placeholder="Best Corrected Visual Acuity After wash left eye"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          {presentingVisualAcuity.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bcVA12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare12MR" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare12MR"
                          name="flare12MR"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells12MR" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells12MR"
                          name="cells12MR"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG12MR" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG12MR"
                          name="LOCSG12MR"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA12MR" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA12MR"
                          name="IOPA12MR"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFMD12MR" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD12MR"
                          name="CVFMD12MR"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFPS12MR" className="mb-2 font-bold">
                          CVF Pattern standard
                        </label>
                        <Field
                          type="number"
                          id="CVFPS12MR"
                          name="CVFPS12MR"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFPS12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="PCVF12MR" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF12MR"
                          name="PCVF12MR"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF12MR"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      {values.PCVF12MR === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFO12MR"
                              className="mb-2 font-bold"
                            >
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO12MR"
                              name="CVFO12MR"
                              // placeholder="select progression"
                              className="border border-gray-400 p-3 rounded-md"
                            >
                              <option value=""></option>
                              <option value="widening">widening</option>
                              <option value="Deepening of scotomas">
                                Deepening of scotomas
                              </option>
                              <option value="higher MD">higher MD</option>
                              <option value="others">others</option>
                            </Field>
                            <ErrorMessage
                              name="CVFO12MR"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}

                      {values.CVFO12MR === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO12MR"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO12MR"
                              name="CVFOO12MR"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO12MR"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex md:justify-end md:ml-auto w-full ">
              <div className="flex-col md:flex-row w-full">
                <div
                  onClick={() => onSave(values)}
                  className="cursor-pointer bg-green-600 text-white p-2 flex h-[50px]  items-center justify-center mb-2 rounded-md w-full"
                  disabled={isSubmitting}
                >
                  Save
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white p-2 mb-2 rounded-md w-full h-[50px] "
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
