import { Space, Spin } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveStageTwo } from "../actions/userAction";
import Axios from "../api/auth";

const initialValuesOut = {
  whatEye: "",
  wasTreatmentAddedL: "",
  wasTreatmentAddedR: "",
  whatTreatmentWasAddedL: "",
  whatTreatmentWasAddedR: "",
  medicationsL: [],
  medicationsR: [],

  medicalTreatmentMonthL: "",
  medicalTreatmentMonthR: "",
  repeatSLTL: "",
  repeatSLTR: "",
  repeatSLTMonthL: "",
  repeatSLTMonthR: "",
  iopBeforeRepeatSLTL: "",
  iopBeforeRepeatSLTR: "",
  iopAfter1hrRepeatLaserL: "",
  iopAfter1hrRepeatLaserR: "",
  iop3MonthsAfterRepeatSLTL: "",
  iop3MonthsAfterRepeatSLTR: "",
  iopAfter6MonthsAfterRepeatSLTL: "",
  iopAfter6MonthsAfterRepeatSLTR: "",
  complicationsAfterSLTL: "",
  complicationsAfterSLTR: "",
  //   hobbies: [],
};

const medications = [
  "Prostaglandin",
  "CAI",
  "MIOTIC",
  "Laser",
  "Trabeculoplasty",
  "Iridotomy",
  "cyclophotocoagulation",
  "surgery",
  "Trab",
  "Trab with MMC",
  "Tube-shunt",
  "combined phaco",
  "Migs",
];

const wasTreatmentAdded = ["yes", "no"];

const getStageThree = async (id) => {
  const res = await Axios.get("/user/stageThree/" + id);
  return res.data;
};
const NewTreatmentData = ({ nextStep, id }) => {
  const [initialValues, setInitialValues] = useState({});
  const curId = useSelector((state) => state.user.curId);
  if (id) {
    useEffect(() => {
      getStageThree(id).then((res) => {
        setInitialValues(res);
      });
    }, []);
  } else {
    useEffect(() => {
      setInitialValues({ ...initialValuesOut });
    }, []);
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(saveStageTwo({ ...values, _id: id ? id : curId }));
    nextStep();
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
    <div className="w-full px-[100px] my-[100px]">
      <h1 className="text-2xl font-bold mb-4 uppercase mt-5">
        New Treatment Data after Procedure
      </h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, values }) => (
          <Form className="space-y-4">
            {(values.whatEye === "left" || values.whatEye === "both") && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Was Treatment added after SLT
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="wasTreatmentAddedL"
                    name="wasTreatmentAddedL"
                    placeholder=" was Treatment Added"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Was Treatment added after SLT</option>
                    {wasTreatmentAdded.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="wasTreatmentAddedL"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {values.wasTreatmentAddedL === "yes" && (
                  <>
                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        What Treatment was added
                      </label>
                      <Field
                        type="text"
                        id="whatTreatmentWasAddedL"
                        name="whatTreatmentWasAddedL"
                        placeholder="Enter a whatTreatmentWasAddedL"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="whatTreatmentWasAddedL"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="hobbies" className="mb-2 font-bold">
                        Medications
                      </label>
                      <Field
                        as={"select"}
                        multiple
                        id="medicationsL"
                        name="medicationsL"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        {medications.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="medicationsL"
                        component="p"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mb-2 font-bold"
                        htmlFor="medicalTreatmentMonthL"
                      >
                        At what month was medical treatment added?
                      </label>

                      <Field
                        type="month"
                        id="medicalTreatmentMonthL"
                        name="medicalTreatmentMonthL"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="repeatSLTL" className="mb-2 font-bold">
                        Was a repeat SLT done?
                      </label>

                      <Field
                        as="select"
                        id="repeatSLTL"
                        name="repeatSLTL"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value="">Select</option>

                        <option value="yes">Yes</option>

                        <option value="no">No</option>
                      </Field>
                    </div>

                    {/* <div className="flex flex-col">
                      <label
                        className="mb-2 font-bold"
                        htmlFor="medicalTreatmentMonthL"
                      >
                        At what month was medical treatment added?
                      </label>

                      <Field
                        type="date"
                        id="medicalTreatmentMonthL"
                        name="medicalTreatmentMonthL"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                    </div> */}

                    {values.repeatSLTL === "yes" && (
                      <>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="repeatSLTMonthL"
                          >
                            At what month?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="month"
                            id="repeatSLTMonthL"
                            name="repeatSLTMonthL"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iopBeforeRepeatSLTL"
                          >
                            What was IOP before the repeat SLT?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iopBeforeRepeatSLTL"
                            name="iopBeforeRepeatSLTL"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iopAfter1hrRepeatLaserL"
                          >
                            What is IOP 1hr after repeat laser?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iopAfter1hrRepeatLaserL"
                            name="iopAfter1hrRepeatLaserL"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iop3MonthsAfterRepeatSLTL"
                          >
                            IOP 3 months after repeat SLT
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iop3MonthsAfterRepeatSLTL"
                            name="iop3MonthsAfterRepeatSLTL"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iopAfter6MonthsAfterRepeatSLTL"
                          >
                            IOP after 6 months after repeat SLT
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iopAfter6MonthsAfterRepeatSLTL"
                            name="iopAfter6MonthsAfterRepeatSLTL"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="complicationsAfterSLTL"
                          >
                            Complications after SLT (mention if any)
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            as="textarea"
                            id="complicationsAfterSLTL"
                            name="complicationsAfterSLTL"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {(values.whatEye === "right" || values.whatEye === "both") && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="number" className="mb-2 font-bold">
                    Was Treatment added after SLT
                  </label>
                  <Field
                    as={"select"}
                    type="text"
                    id="wasTreatmentAddedR"
                    name="wasTreatmentAddedR"
                    placeholder="Enter a wasTreatmentAddedR"
                    className="border border-gray-400 p-2 rounded-md"
                  >
                    <option value="">Was Treatment added after SLT</option>
                    {wasTreatmentAdded.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="wasTreatmentAddedR"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {values.wasTreatmentAddedR === "yes" && (
                  <>
                    <div className="flex flex-col">
                      <label htmlFor="number" className="mb-2 font-bold">
                        What Treatment was added
                      </label>
                      <Field
                        type="text"
                        id="whatTreatmentWasAddedR"
                        name="whatTreatmentWasAddedR"
                        placeholder="Enter a whatTreatmentWasAddedR"
                        className="border border-gray-400 p-2 rounded-md"
                      />

                      <ErrorMessage
                        name="whatTreatmentWasAddedR"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="hobbies" className="mb-2 font-bold">
                        Medications
                      </label>
                      <Field
                        as={"select"}
                        multiple
                        id="medicationsR"
                        name="medicationsR"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        {medications.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="medicationsR"
                        component="p"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mb-2 font-bold"
                        htmlFor="medicalTreatmentMonthR"
                      >
                        At what month was medical treatment added?
                      </label>

                      <Field
                        type="date"
                        id="medicalTreatmentMonthR"
                        name="medicalTreatmentMonthR"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="repeatSLTR" className="mb-2 font-bold">
                        Was a repeat SLT done?
                      </label>

                      <Field
                        as="select"
                        id="repeatSLTR"
                        name="repeatSLTR"
                        className="border border-gray-400 p-2 rounded-md"
                      >
                        <option value="">Select</option>

                        <option value="yes">Yes</option>

                        <option value="no">No</option>
                      </Field>
                    </div>

                    {/* <div className="flex flex-col">
                      <label
                        className="mb-2 font-bold"
                        htmlFor="medicalTreatmentMonthR"
                      >
                        At what month was medical treatment added?
                      </label>

                      <Field
                        type="date"
                        id="medicalTreatmentMonthR"
                        name="medicalTreatmentMonthR"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                    </div> */}

                    {values.repeatSLTR === "yes" && (
                      <>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="repeatSLTMonthR"
                          >
                            At what month?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="month"
                            id="repeatSLTMonthR"
                            name="repeatSLTMonthR"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iopBeforeRepeatSLTR"
                          >
                            What was IOP before the repeat SLT?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iopBeforeRepeatSLTR"
                            name="iopBeforeRepeatSLTR"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iopAfter1hrRepeatLaserR"
                          >
                            What is IOP 1hr after repeat laser?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iopAfter1hrRepeatLaserR"
                            name="iopAfter1hrRepeatLaserR"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iop3MonthsAfterRepeatSLTR"
                          >
                            IOP 3 months after repeat SLT
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iop3MonthsAfterRepeatSLTR"
                            name="iop3MonthsAfterRepeatSLTR"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="iopAfter6MonthsAfterRepeatSLTR"
                          >
                            IOP after 6 months after repeat SLT
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="number"
                            id="iopAfter6MonthsAfterRepeatSLTR"
                            name="iopAfter6MonthsAfterRepeatSLTR"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            className="mb-2 font-bold"
                            htmlFor="complicationsAfterSLTR"
                          >
                            Complications after SLT (mention if any)
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            as="textarea"
                            id="complicationsAfterSLTR"
                            name="complicationsAfterSLTR"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            <div className="flex justify-end ml-auto w-full">
              <Space>
                <div
                  onClick={() => onSave(values)}
                  className="cursor-pointer bg-green-600 text-white p-2 flex items-center justify-center mb-2 rounded-md w-[200px] h-[50px] text-center"
                  disabled={isSubmitting}
                >
                  Save
                </div>
                {(values.whatEye === "left" &&
                  values.wasTreatmentAddedL === "no") ||
                (values.whatEye === "right" &&
                  values.wasTreatmentAddedR === "no") ||
                (values.whatEye === "both" &&
                  values.wasTreatmentAddedL === "no" &&
                  values.wasTreatmentAddedR === "no") ? (
                  <div
                    onClick={() => onSave(values)}
                    className="cursor-pointer bg-green-600 text-white p-2 flex items-center justify-center mb-2 rounded-md w-[200px] h-[50px] text-center"
                    disabled={isSubmitting}
                  >
                    Finish
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-600 text-white p-2 mb-2 rounded-md w-[200px] h-[50px] "
                    // disabled={isSubmitting}
                  >
                    Next
                  </button>
                )}
              </Space>
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

export default NewTreatmentData;
