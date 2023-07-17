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

  BIOP2: "",
BIOPR2: "",
howmanymililitreofwaterwasgiven2: "", // new
howmanymililitreofwaterwasgivenR2: "", // new
iop5minL2: "", //number
iop5minR2: "", //number
iop15MinL2: "",
iop15MinR2: "",
iop30minL2: "",
iop30minR2: "",
iop45minR2: "",
iop45minL2: "",
iop1HRL2: "",
iop1HRR2: "",
averageEnergyForProcedureL2: "", //Number
averageEnergyForProcedureR2: "", //Number

noOfShotsL2: "",
noOfShotsR2: "",
powerUsedL2: "",
powerUsedR2: "",
noOfQuadrantsTreatedL2: "",
noOfQuadrantsTreatedR2: "",
pigmentationSuperiorL2: "",
pigmentationSuperiorR2: "",

LOCSG2R2: "",
LOCSG2L2: "",

pigmentationInferiorL2: "",
pigmentationInferiorR2: "",

pigmentationNasalL2: "",
pigmentationNasalR2: "",

pigmentationTemporalL2: "",
pigmentationTemporalR2: "",
procedureComplicationL2: "",
procedureComplicationR2: "",

ocularPainL2: "",
ocularPainR2: "",

// if yes show scale
pain1hrL2: "",
pain1hrR2: "",
pain24hrL2: "",
pain24hrR2: "",
pain48hrL2: "",
pain48hrR2: "",

medicationsBeforeL2: "",
medicationsBeforeR2: "",
//   hobbies: []: "",
vaUnaided1HRL2: "",
vaUnaided1HRR2: "",

bcVA1HRL2: "",
bcVA1HRR2: "",

flare1HRL2: "",
flare1HRR2: "",

cells1HRL2: "",
cells1HRR2: "",

LOCSG1HRR2: "",
LOCSG1HRL2: "",

IOPA1HRL2: "",
IOPA1HRR2: "",

comp1HRL2: "",
comp1HRR2: "",

BV1HRL2: "",
BV1HRR2: "",

//24HR
vaUnaided24HRL2: "",
vaUnaided24HRR2: "",

bcVA24HRL2: "",
bcVA24HRR2: "",

flare24HRL2: "",
flare24HRR2: "",

cells24HRL2: "",
cells24HRR2: "",

LOCSG24HRR2: "",
LOCSG24HRL2: "",

IOPA24HRL2: "",
IOPA24HRR2: "",

comp24HRL2: "",
comp24HRR2: "",

//1WEEK
vaUnaided1WL2: "",
vaUnaided1WR2: "",

bcVA1WL2: "",
bcVA1WR2: "",

flare1WL2: "",
flare1WR2: "",

cells1WL2: "",
cells1WR2: "",

LOCSG1WR2: "",
LOCSG1WL2: "",

IOPA1WL2: "",
IOPA1WR2: "",

comp1WL2: "",
comp1WR2: "",

//1MONTH
vaUnaided1ML2: "",
vaUnaided1MR2: "",

bcVA1ML2: "",
bcVA1MR2: "",

flare1ML2: "",
flare1MR2: "",

cells1ML2: "",
cells1MR2: "",

LOCSG1MR2: "",
LOCSG1ML2: "",

IOPA1ML2: "",
IOPA1MR2: "",

comp1ML2: "",
comp1MR2: "",

//2MONTH
vaUnaided2ML2: "",
vaUnaided2MR2: "",

bcVA2ML2: "",
bcVA2MR2: "",

flare2ML2: "",
flare2MR2: "",

cells2ML2: "",
cells2MR2: "",

LOCSG2MR2: "",
LOCSG2ML2: "",

IOPA2ML2: "",
IOPA2MR2: "",

Gonioscopy2ML2: "",
Gonioscopy2MR2: "",

openessOfQuadrant2MR2: "",
openessOfQuadrant2ML2: "",

PAS2ML2: "",
PAS2MR2: "",

pigment2ML2: "",
pigment2MR2: "",

pigmentO2ML2: "",
pigmentO2MR2: "",

SLT2ML2: "",
SLT2MR2: "",

BIOP2ML2: "",
BIOPR2MR2: "",
howmanymililitreofwaterwasgiven2ML2: "", // new
howmanymililitreofwaterwasgivenR2MR2: "", // new
iop5minL2ML2: "", //number
iop5minR2MR2: "", //number
iop15MinL2ML2: "",
iop15MinR2MR2: "",
iop30minL2ML2: "",
iop30minR2MR2: "",
iop45minL2ML2: "",
iop45minR2MR2: "",
iop1HRL2ML2: "",
iop1HRR2MR2: "",

//3MONTH
vaUnaided3ML2: "",
vaUnaided3MR2: "",

bcVA3ML2: "",
bcVA3MR2: "",

flare3ML2: "",
flare3MR2: "",

cells3ML2: "",
cells3MR2: "",

LOCSG3MR2: "",
LOCSG3ML2: "",

IOPA3ML2: "",
IOPA3MR2: "",

Gonioscopy3ML2: "",
Gonioscopy3MR2: "",

openessOfQuadrant3MR2: "",
openessOfQuadrant3ML2: "",

PAS3ML2: "",
PAS3MR2: "",

pigment3ML2: "",
pigment3MR2: "",

pigmentO3ML2: "",
pigmentO3MR2: "",

SLT3ML2: "",
SLT3MR2: "",

//6MONTH
vaUnaided6ML2: "",
vaUnaided6MR2: "",

bcVA6ML2: "",
bcVA6MR2: "",

flare6ML2: "",
flare6MR2: "",

cells6ML2: "",
cells6MR2: "",

LOCSG6MR2: "",
LOCSG6ML2: "",

IOPA6ML2: "",
IOPA6MR2: "",

Gonioscopy6ML2: "",
Gonioscopy6MR2: "",

openessOfQuadrant6MR2: "",
openessOfQuadrant6ML2: "",

PAS6ML2: "",
PAS6MR2: "",

pigment6ML2: "",
pigment6MR2: "",

pigmentO6ML2: "",
pigmentO6MR2: "",

SLT6ML2: "",
SLT6MR2: "",

CVFMD6ML2: "",
CVFMD6MR2: "",

PCVF6ML2: "",
PCVF6MR2: "",

CVFO6ML2: "",
CVFO6MR2: "",

CVFOO6ML2: "",
CVFOO6MR2: "",

//9 month
vaUnaided9ML2: "",
vaUnaided9MR2: "",

bcVA9ML2: "",
bcVA9MR2: "",

flare9ML2: "",
flare9MR2: "",

cells9ML2: "",
cells9MR2: "",

LOCSG9MR2: "",
LOCSG9ML2: "",

IOPA9ML2: "",
IOPA9MR2: "",

// 12 MONTH

vaUnaided12ML2: "",
vaUnaided12MR2: "",

bcVA12ML2: "",
bcVA12MR2: "",

flare12ML2: "",
flare12MR2: "",

cells12ML2: "",
cells12MR2: "",

LOCSG12MR2: "",
LOCSG12ML2: "",

IOPA12ML2: "",
IOPA12MR2: "",

CVFMD12ML2: "",
CVFMD12MR2: "",

PCVF12ML2: "",
PCVF12MR2: "",

CVFO12ML2: "",
CVFO12MR2: "",

CVFOO12ML2: "",
CVFOO12MR2: "",

CVFPS12ML2: "",
CVFPS12MR2: "",
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

const EyeSpecificForm2 = ({ nextStep, id, currentStep }) => {
  const [initialValues, setInitialValues] = useState({});
  const curId = useSelector((state) => state.user.curId);
  const previous = useSelector((state) => state.user.prev);

  // console.log(previous);
  if (id) {
    useEffect(() => {
      getStageTwo(id).then((res) => {
        setInitialValues(res);
      });
    }, []);
  } else {
    useEffect(() => {
      setInitialValues({ ...initialValuesOut });
    }, []);
  }
  useEffect(() => {
    // console.log(initialValues);
  }, [currentStep, curId]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const previ = {
      number: previous?.number,
      statusOfPatient: previous?.statusOfPatient, // medication/naive patient, on medication and hard washout
      YOFB: previous?.YOFB,
      ethnicity: previous?.ethnicity,
      ehnicityO: previous?.ethnicityO,
      gender: previous?.gender,
      travelTime: previous?.travelTime,
      education: previous?.education,
      glucoma: previous?.glucoma,
      glucomaO: previous?.glucomaO,
      hadOfGlaucoma: previous?.hadOfGlaucoma,
      relativeWithBlindness: previous?.relativeWithBlindness,
      historyOfGlucoma: previous?.historyOfGlucoma,
      historyOfHYPERTENSION: previous?.historyOfHYPERTENSION,
      BPSYSTOLIC: previous?.BPSYSTOLIC,
      BPDIASTOLIC: previous?.BPDIASTOLIC,
      weight: previous?.weight,
      height: previous?.height,
      historyOfDiabetes: previous?.historyOfDiabetes,
    };
    let newObj = {
      ...values,
    };
    if (typeof previous !== "undefined" && Object.keys(previous).length > 0) {
      newObj = {
        ...newObj,
        ...previ,
      };
    }

    console.log(newObj);
    // console.log(values._id);
    dispatch(saveStageTwo({ ...newObj, _id: values._id ? values._id : curId }));
    // navigate("/edit_user/" + values._id + "/3");
    nextStep();
  };

  const onSave = (values) => {
    const previ = {
      number: previous?.number,
      statusOfPatient: previous?.statusOfPatient, // medication/naive patient, on medication and hard washout
      YOFB: previous?.YOFB,
      ethnicity: previous?.ethnicity,
      ehnicityO: previous?.ethnicityO,
      gender: previous?.gender,
      travelTime: previous?.travelTime,
      education: previous?.education,
      glucoma: previous?.glucoma,
      glucomaO: previous?.glucomaO,
      hadOfGlaucoma: previous?.hadOfGlaucoma,
      relativeWithBlindness: previous?.relativeWithBlindness,
      historyOfGlucoma: previous?.historyOfGlucoma,
      historyOfHYPERTENSION: previous?.historyOfHYPERTENSION,
      BPSYSTOLIC: previous?.BPSYSTOLIC,
      BPDIASTOLIC: previous?.BPDIASTOLIC,
      weight: previous?.weight,
      height: previous?.height,
      historyOfDiabetes: previous?.historyOfDiabetes,
    };
    let newObj = {
      ...values,
    };
    if (typeof previous !== "undefined" && Object.keys(previous).length > 0) {
      newObj = {
        ...newObj,
        ...previ,
      };
    }

    dispatch(saveStageTwo({ ...newObj, _id: values._id ? values._id : curId }));
    navigate("/dashboard");
  };
  return Object.keys(initialValues).length < 1 ? (
    <div className="flex h-screen w-full items-center justify-center">
      <Spin />
    </div>
  ) : (
    <div className="w-full mt-[100px] md:px-[100px] px-5">
      <h1 className="text-2xl font-bold mb-4 uppercase mt-5">
        Eye Specific Data
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form className="">
            <div
              id="hhh"
              className="flex gap-2 justify-between flex-row-reverse h-screen overflow-y-scroll"
            >
              <div className="w-1/2">
                {(values.whatEye === "left" || values.whatEye === "both") && (
                  <>
                    <div className="flex flex-col">
                      <label htmlFor="BIOP2" className="mb-2 font-bold">
                        Water drinking test Baseline IOP
                      </label>
                      <Field
                        type="number"
                        id="BIOP2"
                        name="BIOP2"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="BIOP2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="howmanymililitreofwaterwasgiven2"
                        className="mb-2 font-bold"
                      >
                        how many mililitre of water was given
                      </label>
                      <Field
                        type="number"
                        id="howmanymililitreofwaterwasgiven2"
                        name="howmanymililitreofwaterwasgiven2"
                        // placeholder="how many mililitre of water was given"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="howmanymililitreofwaterwasgiven2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop15minL2" className="mb-2 font-bold">
                        IOP 15MIN
                      </label>
                      <Field
                        type="number"
                        id="iop15MinL2"
                        name="iop15MinL2"
                        // placeholder="IOP 15MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop15MinL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop30minL2" className="mb-2 font-bold">
                        IOP 30MIN
                      </label>
                      <Field
                        type="number"
                        id="iop30minL2"
                        name="iop30minL2"
                        // placeholder="IOP 30MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop30minL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop45minL2" className="mb-2 font-bold">
                        IOP 45MIN
                      </label>
                      <Field
                        type="number"
                        id="iop45minL2"
                        name="iop45minL2"
                        // placeholder="IOP 30MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop45minL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop1HRL2" className="mb-2 font-bold">
                        IOP 1HR
                      </label>
                      <Field
                        type="number"
                        id="iop1HRL2"
                        name="iop1HRL2"
                        // placeholder="IOP 1HR"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop1HRL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="averageEnergyForProcedureL2"
                        className="mb-2 font-bold"
                      >
                        Average Energy For Procedure
                      </label>
                      <Field
                        type="number"
                        id="averageEnergyForProcedureL2"
                        name="averageEnergyForProcedureL2"
                        // placeholder="Average Energy For Procedure"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="averageEnergyForProcedureL2"
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
                        id="noOfShotsL2"
                        name="noOfShotsL2"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="noOfShotsL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    {/* <div className="flex flex-col">
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
                    </div> */}

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        How Many Quadrants were treated Left
                      </label>
                      <Field
                        type="number"
                        id="noOfQuadrantsTreatedL2"
                        name="noOfQuadrantsTreatedL2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="noOfQuadrantsTreatedL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationSuperiorL2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Superior
                      </label>
                      <Field
                        type="text"
                        id="pigmentationSuperiorL2"
                        name="pigmentationSuperiorL2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationSuperiorL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationInferiorL2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Inferior
                      </label>
                      <Field
                        type="text"
                        id="pigmentationInferiorL2"
                        name="pigmentationInferiorL2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationInferiorL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationNasalL2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Nasal
                      </label>
                      <Field
                        type="text"
                        id="pigmentationNasalL2"
                        name="pigmentationNasalL2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationNasalL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationTemporalL2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Temporal
                      </label>
                      <Field
                        type="text"
                        id="pigmentationTemporalL2"
                        name="pigmentationTemporalL2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationTemporalL2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Any complications during procedure Left
                      </label>
                      <Field
                        type="text"
                        as="textarea"
                        id="procedureComplicationL2"
                        name="procedureComplicationL2"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="procedureComplicationL2"
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
                        id="ocularPainL2"
                        name="ocularPainL2"
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
                        name="ocularPainL2"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    {values.ocularPainL2 === "present" && (
                      <>
                        <div className="flex flex-col">
                          <label htmlFor="pain1hrL2" className="mb-2 font-bold">
                            Level of pain 1HR
                          </label>
                          <Field
                            type="number"
                            id="pain1hrL2"
                            name="pain1hrL2"
                            // placeholder="Level of pain 1HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain1hrL2"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain24hrL2" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain24hrL2"
                            name="pain24hrL2"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain24hrL2"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain48hrL2" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain48hrL2"
                            name="pain48hrL2"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain48hrL2"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="medicationsBeforeL2"
                        className="mb-2 font-bold"
                      >
                        Medications(select all that apply)
                      </label>
                      <Field
                        as={"select"}
                        multiple
                        id="medicationsBeforeL2"
                        name="medicationsBeforeL2"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        {medications.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="medicationsBeforeL2"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="LOCSG1HRL2" className="mb-2 font-bold">
                        LOCS grading
                      </label>
                      <Field
                        type="text"
                        id="LOCSG1HRL2"
                        name="LOCSG1HRL2"
                        // placeholder="LOCS grading"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="LOCSG1HRL2"
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
                          htmlFor="vaUnaided1HRL2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1HRL2"
                          name="vaUnaided1HRL2"
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
                          name="vaUnaided1HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1HRL2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1HRL2"
                          name="bcVA1HRL2"
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
                          name="bcVA1HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1HRL2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1HRL2"
                          name="flare1HRL2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1HRL2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1HRL2"
                          name="cells1HRL2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1HRL2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1HRL2"
                          name="IOPA1HRL2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1HRL2" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1HRL2"
                          name="comp1HRL2"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="BV1HRL2" className="mb-2 font-bold">
                          Bluring of vision
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="BV1HRL2"
                          name="BV1HRL2"
                          // placeholder="SLT"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="BV1HRL2"
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
                          htmlFor="vaUnaided24HRL2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided24HRL2"
                          name="vaUnaided24HRL2"
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
                          name="vaUnaided24HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA24HRL2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA24HRL2"
                          name="bcVA24HRL2"
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
                          name="bcVA24HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare24HRL2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare24HRL2"
                          name="flare24HRL2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare24HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells24HRL2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells24HRL2"
                          name="cells24HRL2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells24HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA24HRL2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA24HRL2"
                          name="IOPA24HRL2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA24HRL2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp24HRL2" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp24HRL2"
                          name="comp24HRL2"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp24HRL2"
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
                          htmlFor="vaUnaided1ML2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1ML2"
                          name="vaUnaided1ML2"
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
                          name="vaUnaided1ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1ML2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1ML2"
                          name="bcVA1ML2"
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
                          name="bcVA1ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1ML2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1ML2"
                          name="flare1ML2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1ML2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1ML2"
                          name="cells1ML2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      {/* <div className="flex flex-col">
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
                      </div> */}

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1ML2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1ML2"
                          name="IOPA1ML2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1ML2" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1ML2"
                          name="comp1ML2"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1ML2"
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
                          htmlFor="vaUnaided2ML2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided2ML2"
                          name="vaUnaided2ML2"
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
                          name="vaUnaided2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA2ML2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA2ML2"
                          name="bcVA2ML2"
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
                          name="bcVA2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare2ML2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare2ML2"
                          name="flare2ML2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells2ML2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells2ML2"
                          name="cells2ML2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG2ML2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG2ML2"
                          name="LOCSG2ML2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA2ML2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA2ML2"
                          name="IOPA2ML2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA2ML2"
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
                          id="Gonioscopy2ML2"
                          name="Gonioscopy2ML2"
                          // placeholder="Gonioscopy"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="Gonioscopy2ML2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="openessOfQuadrant2ML2"
                          className="mb-2 font-bold"
                        >
                          Openness of the quadrant
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="openessOfQuadrant2ML2"
                          name="openessOfQuadrant2ML2"
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
                          name="openessOfQuadrant2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PAS2ML2" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS2ML2"
                          name="PAS2ML2"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment2ML2" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment2ML2"
                          name="pigment2ML2"
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
                        <label htmlFor="pigmentO2ML2" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO2ML2"
                          name="pigmentO2ML2"
                          // placeholder="Others"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT2ML2" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT2ML2"
                          name="SLT2ML2"
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
                          name="SLT2ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Water Drinking
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="BIOP2ML2" className="mb-2 font-bold">
                          Water drinking test Baseline IOP
                        </label>
                        <Field
                          type="number"
                          id="BIOP2ML2"
                          name="BIOP2ML2"
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
                          htmlFor="howmanymililitreofwaterwasgiven2ML2"
                          className="mb-2 font-bold"
                        >
                          how many mililitre of water was given
                        </label>
                        <Field
                          type="number"
                          id="howmanymililitreofwaterwasgiven2ML2"
                          name="howmanymililitreofwaterwasgiven2ML2"
                          // placeholder="how many mililitre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="howmanymililitreofwaterwasgiven2ML2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      {/* <div className="flex flex-col">
                        <label htmlFor="iop5minL2ML" className="mb-2 font-bold">
                          IOP 5MIN
                        </label>
                        <Field
                          type="number"
                          id="iop5minL2ML"
                          name="iop5minL2ML"
                          // placeholder="how many mililitre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop5minL2ML"
                          component="div"
                          className="text-red-500"
                        />
                      </div> */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop15MinL2ML2"
                          className="mb-2 font-bold"
                        >
                          IOP 15MIN
                        </label>
                        <Field
                          type="number"
                          id="iop15MinL2ML2"
                          name="iop15MinL2ML2"
                          // placeholder="IOP 15MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop15MinL2ML2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop30minL2ML2"
                          className="mb-2 font-bold"
                        >
                          IOP 30MIN
                        </label>
                        <Field
                          type="number"
                          id="iop30minL2ML2"
                          name="iop30minL2ML2"
                          // placeholder="IOP 30MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop30minL2ML2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="iop45min2ML2" className="mb-2 font-bold">
                          IOP 45MIN
                        </label>
                        <Field
                          type="number"
                          id="iop45minL2ML2"
                          name="iop45minL2ML2"
                          // placeholder="IOP 30MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop45minL2ML2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="iop1HRL2ML2" className="mb-2 font-bold">
                          IOP 1HR
                        </label>
                        <Field
                          type="number"
                          id="iop1HRL2ML2"
                          name="iop1HRL2ML2"
                          // placeholder="IOP 1HR"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop1HRL2ML2"
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
                          htmlFor="vaUnaided3ML2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided3ML2"
                          name="vaUnaided3ML2"
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
                        <label htmlFor="bcVA3ML2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA3ML2"
                          name="bcVA3ML2"
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
                          name="bcVA3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare3ML2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare3ML2"
                          name="flare3ML2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells3ML2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells3ML2"
                          name="cells3ML2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG3ML2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG3ML2"
                          name="LOCSG3ML2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA3ML2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA3ML2"
                          name="IOPA3ML2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA3ML2"
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
                          id="Gonioscopy3ML2"
                          name="Gonioscopy3ML2"
                          // placeholder="Gonioscopy"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="Gonioscopy3ML2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="openessOfQuadrant3ML2"
                          className="mb-2 font-bold"
                        >
                          Openness of the quadrant
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="openessOfQuadrant3ML2"
                          name="openessOfQuadrant3ML2"
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
                          name="openessOfQuadrant3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PAS3ML2" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS3ML2"
                          name="PAS3ML2"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment3ML2" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment3ML2"
                          name="pigment3ML2"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO3ML2" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO3ML2"
                          name="pigmentO3ML2"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO3ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT3ML2" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT3ML2"
                          name="SLT3ML2"
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
                          name="SLT3ML2"
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
                          htmlFor="vaUnaided6ML2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided6ML2"
                          name="vaUnaided6ML2"
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
                          name="vaUnaided6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA6ML2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA6ML2"
                          name="bcVA6ML2"
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
                          name="bcVA6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare6ML2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare6ML2"
                          name="flare6ML2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells6ML2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells6ML2"
                          name="cells6ML2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG6ML2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG6ML2"
                          name="LOCSG6ML2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA6ML2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA6ML2"
                          name="IOPA6ML2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA6ML2"
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
                          id="Gonioscopy6ML2"
                          name="Gonioscopy6ML2"
                          // placeholder="Gonioscopy"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="Gonioscopy6ML2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="openessOfQuadrant6ML2"
                          className="mb-2 font-bold"
                        >
                          Openness of the quadrant
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="openessOfQuadrant6ML2"
                          name="openessOfQuadrant6ML2"
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
                          name="openessOfQuadrant6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PAS6ML2" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS6ML2"
                          name="PAS6ML2"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment6ML2" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment6ML2"
                          name="pigment6ML2"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO6ML2" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO6ML2"
                          name="pigmentO6ML2"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT6ML2" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT6ML2"
                          name="SLT6ML2"
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
                          name="SLT6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="CVFMD6ML2" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD6ML2"
                          name="CVFMD6ML2"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PCVF6ML2" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF6ML2"
                          name="PCVF6ML2"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF6ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      {values.PCVF6ML2 === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label htmlFor="CVFO6ML2" className="mb-2 font-bold">
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO6ML2"
                              name="CVFO6ML2"
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
                              name="CVFO6ML2"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                      {values.CVFO6ML2 === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO6ML2"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO6ML2"
                              name="CVFOO6ML2"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO6ML2"
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
                          htmlFor="vaUnaided9ML2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided9ML2"
                          name="vaUnaided9ML2"
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
                          name="vaUnaided9ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA9ML2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA9ML2"
                          name="bcVA9ML2"
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
                          name="bcVA9ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare9ML2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare9ML2"
                          name="flare9ML2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare9ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells9ML2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells9ML2"
                          name="cells9ML2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells9ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG9ML2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG9ML2"
                          name="LOCSG9ML2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG9ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA9ML2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA9ML2"
                          name="IOPA9ML2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA9ML2"
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
                          htmlFor="vaUnaided12ML2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided12ML2"
                          name="vaUnaided12ML2"
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
                          name="vaUnaided12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA12ML2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA12ML2"
                          name="bcVA12ML2"
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
                          name="bcVA12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare12ML2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare12ML2"
                          name="flare12ML2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells12ML2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells12ML2"
                          name="cells12ML2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG12ML2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG12ML2"
                          name="LOCSG12ML2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA12ML2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA12ML2"
                          name="IOPA12ML2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFMD12ML2" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD12ML2"
                          name="CVFMD12ML2"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFPS12ML2" className="mb-2 font-bold">
                          CVF Pattern standard
                        </label>
                        <Field
                          type="number"
                          id="CVFPS12ML2"
                          name="CVFPS12ML2"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFPS12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="PCVF12ML2" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF12ML2"
                          name="PCVF12ML2"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF12ML2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      {values.PCVF12ML2 === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFO12ML2"
                              className="mb-2 font-bold"
                            >
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO12ML2"
                              name="CVFO12ML2"
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
                              name="CVFO12ML2"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}

                      {values.CVFO12ML2 === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO12ML2"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO12ML2"
                              name="CVFOO12ML2"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO12ML2"
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
                      <label htmlFor="BIOPR2" className="mb-2 font-bold">
                        Water drinking test Baseline IOP
                      </label>
                      <Field
                        type="number"
                        id="BIOPRR2"
                        name="BIOPR2"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="BIOPR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="howmanymililitreofwaterwasgivenR2"
                        className="mb-2 font-bold"
                      >
                        how many mililitre of water was given
                      </label>
                      <Field
                        type="number"
                        id="howmanymililitreofwaterwasgivenR2"
                        name="howmanymililitreofwaterwasgivenR2"
                        // placeholder="how many mililitre of water was given"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="howmanymililitreofwaterwasgivenR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    {/* <div className="flex flex-col">
                      <label htmlFor="iop5minR" className="mb-2 font-bold">
                        IOP 5MIN
                      </label>
                      <Field
                        type="number"
                        id="iop5minR"
                        name="iop5minR"
                        // placeholder="how many mililitre of water was given"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop5minR"
                        component="div"
                        className="text-red-500"
                      />
                    </div> */}

                    <div className="flex flex-col">
                      <label htmlFor="iop15MinR2" className="mb-2 font-bold">
                        IOP 15MIN
                      </label>
                      <Field
                        type="number"
                        id="iop15MinR2"
                        name="iop15MinR2"
                        // placeholder="IOP 15MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop15MinR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop30minR2" className="mb-2 font-bold">
                        IOP 30MIN
                      </label>
                      <Field
                        type="number"
                        id="iop30minR2"
                        name="iop30minR2"
                        // placeholder="IOP 30MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop30minR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop45minR2" className="mb-2 font-bold">
                        IOP 45MIN
                      </label>
                      <Field
                        type="number"
                        id="iop45minR2"
                        name="iop45minR2"
                        // placeholder="IOP 45MIN"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop45minR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="iop1HRR2" className="mb-2 font-bold">
                        IOP 1HR
                      </label>
                      <Field
                        type="number"
                        id="iop1HRR2"
                        name="iop1HRR2"
                        // placeholder="IOP 1HR"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="iop1HRR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="averageEnergyForProcedureR2"
                        className="mb-2 font-bold"
                      >
                        Average Energy For Procedure
                      </label>
                      <Field
                        type="number"
                        id="averageEnergyForProcedureR2"
                        name="averageEnergyForProcedureR2"
                        // placeholder="Average Energy For Procedure"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="averageEnergyForProcedureR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <Divider />

                    <div className="flex flex-col">
                      <label htmlFor="noOfShotsR2" className="mb-2 font-bold">
                        How Many Shots were given Right
                      </label>
                      <Field
                        type="number"
                        id="noOfShotsR2"
                        name="noOfShotsR2"
                        // placeholder="Enter a no Of Shots given Right"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="noOfShotsR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    {/* <div className="flex flex-col">
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
                    </div> */}

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        How Many Quadrants were treated Right
                      </label>
                      <Field
                        type="number"
                        id="noOfQuadrantsTreatedR2"
                        name="noOfQuadrantsTreatedR2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="noOfQuadrantsTreatedR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationSuperiorR2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Superior
                      </label>
                      <Field
                        type="text"
                        id="pigmentationSuperiorR2"
                        name="pigmentationSuperiorR2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationSuperiorR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationInferiorR2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Inferior
                      </label>
                      <Field
                        type="text"
                        id="pigmentationInferiorR2"
                        name="pigmentationInferiorR2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationInferiorR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationNasalR2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Nasal
                      </label>
                      <Field
                        type="text"
                        id="pigmentationNasalR2"
                        name="pigmentationNasalR2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationNasalR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="pigmentationTemporalR2"
                        className="mb-2 font-bold"
                      >
                        Pigmentation Temporal
                      </label>
                      <Field
                        type="text"
                        id="pigmentationTemporalR2"
                        name="pigmentationTemporalR2"
                        // placeholder="Enter a no Of Quadrants treated Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="pigmentationTemporalR2"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        Any complications during procedure Right
                      </label>
                      <Field
                        type="text"
                        as="textarea"
                        id="procedureComplicationR2"
                        name="procedureComplicationR2"
                        // placeholder="Enter a no Of Shots given Left"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="procedureComplicationR2"
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
                        id="ocularPainR2"
                        name="ocularPainR2"
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
                        name="ocularPainR2"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    {values.ocularPainR2 === "present" && (
                      <>
                        <div className="flex flex-col">
                          <label htmlFor="pain1hrR2" className="mb-2 font-bold">
                            Level of pain 1HR
                          </label>
                          <Field
                            type="number"
                            id="pain1hrR2"
                            name="pain1hrR2"
                            // placeholder="Level of pain 1HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain1hrR2"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain24hrR2" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain24hrR2"
                            name="pain24hrR2"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain24hrR2"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="pain48hrR2" className="mb-2 font-bold">
                            Level of pain 24HR
                          </label>
                          <Field
                            type="number"
                            id="pain48hrR2"
                            name="pain48hrR2"
                            // placeholder="Level of pain 24HR"
                            className="border border-gray-400 p-2 rounded-md"
                          />
                          <ErrorMessage
                            name="pain48hrR2"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="medicationsBeforeR2"
                        className="mb-2 font-bold"
                      >
                        Medications(select all that apply)
                      </label>
                      <Field
                        as={"select"}
                        multiple
                        id="medicationsBeforeR2"
                        name="medicationsBeforeR2"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        {medications.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="medicationsBeforeR2"
                        component="p"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="LOCSG1HRR2" className="mb-2 font-bold">
                        LOCS grading
                      </label>
                      <Field
                        type="text"
                        id="LOCSG1HRR2"
                        name="LOCSG1HRR2"
                        // placeholder="LOCS grading"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="LOCSG1HRR2"
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
                          htmlFor="vaUnaided1HRR2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1HRR2"
                          name="vaUnaided1HRR2"
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
                          name="vaUnaided1HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1HRR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1HRR2"
                          name="bcVA1HRR2"
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
                          name="bcVA1HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1HRR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1HRR2"
                          name="flare1HRR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1HRR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1HRR2"
                          name="cells1HRR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1HRR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1HRR2"
                          name="IOPA1HRR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1HRR2" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1HRR2"
                          name="comp1HRR2"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="BV1HRR2" className="mb-2 font-bold">
                          Bluring of vision
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="BV1HRR2"
                          name="BV1HRR2"
                          // placeholder="SLT"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="BV1HRR2"
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
                          htmlFor="vaUnaided24HRR2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided24HRR2"
                          name="vaUnaided24HRR2"
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
                          name="vaUnaided24HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA24HRR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA24HRR2"
                          name="bcVA24HRR2"
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
                          name="bcVA24HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare24HRR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare24HRR2"
                          name="flare24HRR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare24HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells24HRR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells24HRR2"
                          name="cells24HRR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells24HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      {/* <div className="flex flex-col">
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
                      </div> */}

                      <div className="flex flex-col">
                        <label htmlFor="IOPA24HRR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA24HRR2"
                          name="IOPA24HRR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA24HRR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp24HRR2" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp24HRR2"
                          name="comp24HRR2"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp24HRR2"
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
                          htmlFor="vaUnaided1MR2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided1MR2"
                          name="vaUnaided1MR2"
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
                          name="vaUnaided1MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA1MR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA1MR2"
                          name="bcVA1MR2"
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
                          name="bcVA1MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare1MR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare1MR2"
                          name="flare1MR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare1MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells1MR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells1MR2"
                          name="cells1MR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells1MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      {/* <div className="flex flex-col">
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
                      </div> */}

                      <div className="flex flex-col">
                        <label htmlFor="IOPA1MR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA1MR2"
                          name="IOPA1MR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA1MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="comp1MR2" className="mb-2 font-bold">
                          complications
                        </label>
                        <Field
                          as="textarea"
                          type="text"
                          id="comp1MR2"
                          name="comp1MR2"
                          // placeholder="complications"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="comp1MR2"
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
                          htmlFor="vaUnaided2MR2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided2MR2"
                          name="vaUnaided2MR2"
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
                          name="vaUnaided2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA2MR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA2MR2"
                          name="bcVA2MR2"
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
                          name="bcVA2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare2MR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare2MR2"
                          name="flare2MR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells2MR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells2MR2"
                          name="cells2MR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG2MR2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG2MR2"
                          name="LOCSG2MR2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA2MR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA2MR2"
                          name="IOPA2MR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA2MR2"
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
                          id="Gonioscopy2MR2"
                          name="Gonioscopy2MR2"
                          // placeholder="Gonioscopy"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="Gonioscopy2MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="openessOfQuadrant2MR2"
                          className="mb-2 font-bold"
                        >
                          Openness of the quadrant
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="openessOfQuadrant2MR2"
                          name="openessOfQuadrant2MR2"
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
                          name="openessOfQuadrant2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PAS2MR2" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS2MR2"
                          name="PAS2MR2"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-2 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment2MR2" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment2MR2"
                          name="pigment2MR2"
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
                        <label htmlFor="pigmentO2MR2" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO2MR2"
                          name="pigmentO2MR2"
                          // placeholder="Others"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT2MR2" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT2MR2"
                          name="SLT2MR2"
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
                          name="SLT2MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <Divider />
                      Water Drinking
                      <Divider />
                      <div className="flex flex-col">
                        <label htmlFor="BIOPR2MR2" className="mb-2 font-bold">
                          Water drinking test Baseline IOP
                        </label>
                        <Field
                          type="number"
                          id="BIOPR2MR2"
                          name="BIOPR2MR2"
                          // placeholder="Enter a no Of Shots given Left"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="BIOPR2MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="howmanymililitreofwaterwasgivenR2MR2"
                          className="mb-2 font-bold"
                        >
                          how many mililitre of water was given
                        </label>
                        <Field
                          type="number"
                          id="howmanymililitreofwaterwasgivenR2MR2"
                          name="howmanymililitreofwaterwasgivenR2MR2"
                          // placeholder="how many mililitre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="howmanymililitreofwaterwasgivenR2MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      {/* <div className="flex flex-col">
                        <label htmlFor="iop5minR2MR" className="mb-2 font-bold">
                          IOP 5MIN
                        </label>
                        <Field
                          type="number"
                          id="iop5minR2MR"
                          name="iop5minR2MR"
                          // placeholder="how many mililitre of water was given"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop5minR2MR"
                          component="div"
                          className="text-red-500"
                        />
                      </div> */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop15MinR2MR2"
                          className="mb-2 font-bold"
                        >
                          IOP 15MIN
                        </label>
                        <Field
                          type="number"
                          id="iop15MinR2MR2"
                          name="iop15MinR2MR2"
                          // placeholder="IOP 15MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop15MinR2MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop30minR2MR2"
                          className="mb-2 font-bold"
                        >
                          IOP 30MIN
                        </label>
                        <Field
                          type="number"
                          id="iop30minR2MR2"
                          name="iop30minR2MR2"
                          // placeholder="IOP 30MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop30minR2MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="iop45minR2MR2"
                          className="mb-2 font-bold"
                        >
                          IOP 45MIN
                        </label>
                        <Field
                          type="number"
                          id="iop45minR2MR2"
                          name="iop45minR2MR2"
                          // placeholder="IOP 30MIN"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop45minR2MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="iop1HRR2MR2" className="mb-2 font-bold">
                          IOP 1HR
                        </label>
                        <Field
                          type="number"
                          id="iop1HRR2MR2"
                          name="iop1HRR2MR2"
                          // placeholder="IOP 1HR"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="iop1HRR2MR2"
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
                          htmlFor="vaUnaided3MR2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided3MR2"
                          name="vaUnaided3MR2"
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
                          name="vaUnaided3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA3MR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA3MR2"
                          name="bcVA3MR2"
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
                          name="bcVA3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare3MR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare3MR2"
                          name="flare3MR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells3MR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells3MR2"
                          name="cells3MR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG3MR2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG3MR2"
                          name="LOCSG3MR2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA3MR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA3MR2"
                          name="IOPA3MR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA3MR2"
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
                          id="Gonioscopy3MR2"
                          name="Gonioscopy3MR2"
                          // placeholder="Gonioscopy"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="Gonioscopy3MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="openessOfQuadrant3MR2"
                          className="mb-2 font-bold"
                        >
                          Openness of the quadrant
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="openessOfQuadrant3MR2"
                          name="openessOfQuadrant3MR2"
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
                          name="openessOfQuadrant3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PAS3MR2" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS3MR2"
                          name="PAS3MR2"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment3MR2" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment3MR2"
                          name="pigment3MR2"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO3MR2" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO3MR2"
                          name="pigmentO3MR2"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO3MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT3MR2" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT3MR2"
                          name="SLT3MR2"
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
                          name="SLT3MR2"
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
                          htmlFor="vaUnaided6MR2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided6MR2"
                          name="vaUnaided6MR2"
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
                          name="vaUnaided6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bcVA6MR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA6MR2"
                          name="bcVA6MR2"
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
                          name="bcVA6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="flare6MR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare6MR2"
                          name="flare6MR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="cells6MR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells6MR2"
                          name="cells6MR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="LOCSG6MR2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG6MR2"
                          name="LOCSG6MR2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="IOPA6MR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA6MR2"
                          name="IOPA6MR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA6MR2"
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
                          id="Gonioscopy6MR2"
                          name="Gonioscopy6MR2"
                          // placeholder="Gonioscopy"
                          className="border border-gray-400 p-2 rounded-md"
                        />
                        <ErrorMessage
                          name="Gonioscopy6MR2"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="openessOfQuadrant6MR2"
                          className="mb-2 font-bold"
                        >
                          Openness of the quadrant
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="openessOfQuadrant6MR2"
                          name="openessOfQuadrant6MR2"
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
                          name="openessOfQuadrant6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PAS6MR2" className="mb-2 font-bold">
                          Any PAS
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PAS6MR2"
                          name="PAS6MR2"
                          // placeholder="Any PAS"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        <ErrorMessage
                          name="PAS6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigment6MR2" className="mb-2 font-bold">
                          Pigments how many pluses
                        </label>
                        <Field
                          type="number"
                          id="pigment6MR2"
                          name="pigment6MR2"
                          // placeholder="Pigments"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigment6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pigmentO6MR2" className="mb-2 font-bold">
                          Others
                        </label>
                        <Field
                          type="text"
                          id="pigmentO6MR2"
                          name="pigmentO6MR2"
                          // placeholder="Others"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="pigmentO6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="SLT6MR2" className="mb-2 font-bold">
                          SLT
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="SLT6MR2"
                          name="SLT6MR2"
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
                          name="SLT6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="CVFMD6MR2" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD6MR2"
                          name="CVFMD6MR2"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="PCVF6MR2" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF6MR2"
                          name="PCVF6MR2"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF6MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>
                      {values.PCVF6MR2 === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label htmlFor="CVFO6MR2" className="mb-2 font-bold">
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO6MR2"
                              name="CVFO6MR2"
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
                              name="CVFO6MR2"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                      {values.CVFO6MR2 === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO6MR2"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO6MR2"
                              name="CVFOO6MR2"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO6MR2"
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
                          htmlFor="vaUnaided9MR2"
                          className="mb-2 font-bold"
                        >
                          Visual Acuity unaided
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="vaUnaided9MR2"
                          name="vaUnaided9MR2"
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
                          name="vaUnaided9MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA9MR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA9MR2"
                          name="bcVA9MR2"
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
                          name="bcVA9MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare9MR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare9MR2"
                          name="flare9MR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare9MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells9MR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells9MR2"
                          name="cells9MR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells9MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG9MR2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG9MR2"
                          name="LOCSG9MR2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG9MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA9MR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA9MR2"
                          name="IOPA9MR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA9MR2"
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
                          id="vaUnaided12MR2"
                          name="vaUnaided12MR2"
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
                          name="vaUnaided12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="bcVA12MR2" className="mb-2 font-bold">
                          Visual Acuity Best Corrected
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="bcVA12MR2"
                          name="bcVA12MR2"
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
                          name="bcVA12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="flare12MR2" className="mb-2 font-bold">
                          Flare
                        </label>
                        <Field
                          type="text"
                          id="flare12MR2"
                          name="flare12MR2"
                          // placeholder="flare"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="flare12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="cells12MR2" className="mb-2 font-bold">
                          Cells
                        </label>
                        <Field
                          type="text"
                          id="cells12MR2"
                          name="cells12MR2"
                          // placeholder="Cells"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="cells12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="LOCSG12MR2" className="mb-2 font-bold">
                          LOCS grading
                        </label>
                        <Field
                          type="text"
                          id="LOCSG12MR2"
                          name="LOCSG12MR2"
                          // placeholder="LOCS grading"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="LOCSG12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IOPA12MR2" className="mb-2 font-bold">
                          IOP
                        </label>
                        <Field
                          type="text"
                          id="IOPA12MR2"
                          name="IOPA12MR2"
                          // placeholder="IOP"
                          className="border border-gray-400 p-2 rounded-md"
                        />

                        <ErrorMessage
                          name="IOPA12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFMD12MR2" className="mb-2 font-bold">
                          CVF Mean deviation
                        </label>
                        <Field
                          type="number"
                          id="CVFMD12MR2"
                          name="CVFMD12MR2"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFMD12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="CVFPS12MR2" className="mb-2 font-bold">
                          CVF Pattern standard
                        </label>
                        <Field
                          type="number"
                          id="CVFPS12MR2"
                          name="CVFPS12MR2"
                          // placeholder="CVF Mean deviation"
                          className="border border-gray-400 p-3 rounded-md"
                        />

                        <ErrorMessage
                          name="CVFPS12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="PCVF12MR2" className="mb-2 font-bold">
                          Any progression
                        </label>
                        <Field
                          as={"select"}
                          type="text"
                          id="PCVF12MR2"
                          name="PCVF12MR2"
                          // placeholder="SLT"
                          className="border border-gray-400 p-3 rounded-md"
                        >
                          <option value=""></option>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </Field>
                        <ErrorMessage
                          name="PCVF12MR2"
                          component="p"
                          className="text-red-500"
                        />
                      </div>

                      {values.PCVF12MR2 === "yes" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFO12MR2"
                              className="mb-2 font-bold"
                            >
                              select progression
                            </label>
                            <Field
                              as={"select"}
                              type="text"
                              id="CVFO12MR2"
                              name="CVFO12MR2"
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
                              name="CVFO12MR2"
                              component="p"
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}

                      {values.CVFO12MR2 === "others" && (
                        <>
                          <div className="flex flex-col">
                            <label
                              htmlFor="CVFOO12MR2"
                              className="mb-2 font-bold"
                            >
                              Enter progression
                            </label>
                            <Field
                              type="text"
                              id="CVFOO12MR2"
                              name="CVFOO12MR2"
                              // placeholder="Enter progression"
                              className="border border-gray-400 p-3 rounded-md"
                            />

                            <ErrorMessage
                              name="CVFOO12MR2"
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

            <div className="mt-20">
              <div className="flex-col md:flex-row w-full">
                {/* <div
                  onClick={() => onSave(values)}
                  className="cursor-pointer bg-green-600 text-white p-2 flex h-[50px]  items-center justify-center mb-2 rounded-md"
                  disabled={isSubmitting}
                >
                  Save
                </div> */}
                <button
                  type="submit"
                  className="bg-green-600 w-full text-white p-2 mb-2 rounded-md h-[50px] "
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

export default memo(EyeSpecificForm2);
