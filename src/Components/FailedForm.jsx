import React from "react";
import { Formik, Form, Field } from "formik";
import Axios from "../api/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { saveStageTwo } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { Space, Spin } from "antd";
import { memo } from "react";

const initialValuesOut = {
  whatEye: "right",
  treatmentOfferedL: "",
  treatmentOfferedR: "",
  treatmentAcceptedL: "",
  treatmentAcceptedR: "",
  reasonForNoTreatmentL: "",
  reasonForNoTreatmentR: "",
  reasonForNoTreatmentLO: "",
  reasonForNoTreatmentRO: "",
  alternateTherapyOfferedL: "",
  alternateTherapyOfferedR: "",
  typeOfAlternateTherapyL: "",
  typeOfAlternateTherapyR: "",
  alternateTherapyAcceptedL: "",
  alternateTherapyAcceptedR: "",
};

const treatmentOffered = [
  { label: "Medications", value: "medications" },
  { label: "Laser", value: "laser" },
  { label: "Surgery", value: "surgery" },
];

const reasonsForNoTreatmentOptions = [
  { label: "Cost", value: "cost" },
  { label: "Fear", value: "fear" },
  { label: "Lack of transportation", value: "transportation" },
  { label: "Belief that treatment is not needed", value: "notNeeded" },
  { label: "Belief that treatment will do no good", value: "noGood" },
  { label: "Family member disagrees with treatment", value: "familyDisagrees" },
  { label: "Other", value: "other" },
];

const alternateTherapyOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const alternateTherapyTypes = [
  { label: "Medications", value: "medications" },
  { label: "Laser", value: "laser" },
  { label: "Surgery", value: "surgery" },
];

const getStageFour = async (id) => {
  const res = await Axios.get("/user/stageFour/" + id);
  return res.data;
};

const FailedForm = ({ previousStep, id }) => {
  const [initialValues, setInitialValues] = useState({});
  const curId = useSelector((state) => state.user.curId);
  if (id) {
    useEffect(() => {
      getStageFour(id).then((res) => {
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
    navigate("/");
  };
  return Object.keys(initialValues).length < 1 ? (
    <div className="flex h-screen w-full items-center justify-center">
      <Spin />
    </div>
  ) : (
    <div className="w-full md:my-[100px] mt-[100px] md:px-[100px] px-5">
      <h1 className="text-2xl font-bold mb-4 uppercase mt-5">
        New Treatment Data after Procedure
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-4">
            {(values.whatEye === "left" || values.whatEye === "both") && (
              <>
                <div className="flex gap-2 flex-col">
                  <label htmlFor="treatmentOfferedL">Treatment offered?</label>

                  <Field
                    className="border border-gray-400 p-2 rounded-md"
                    name="treatmentOfferedL"
                    as="select"
                  >
                    <option value="">Select an option</option>

                    {treatmentOffered.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="flex gap-2 flex-col">
                  <label htmlFor="treatmentAcceptedL">
                    Treatment accepted?
                  </label>

                  <Field
                    className="border border-gray-400 p-2 rounded-md"
                    name="treatmentAcceptedL"
                    as="select"
                  >
                    <option value="">Select an option</option>

                    <option value="yes">Yes</option>

                    <option value="no">No</option>
                  </Field>
                </div>

                {values.treatmentAcceptedL === "no" && (
                  <>
                    <div className="flex gap-2 flex-col">
                      <label htmlFor="reasonForNoTreatmentL">Why not?</label>

                      <Field
                        className="border border-gray-400 p-2 rounded-md"
                        name="reasonForNoTreatmentL"
                        as="select"
                      >
                        <option value="">Select an option</option>

                        {reasonsForNoTreatmentOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {values.reasonForNoTreatmentL === "other" && (
                      <>
                        <div className="flex gap-2 flex-col">
                          <label htmlFor="reasonForNoTreatmentLO">
                            State why treatment was not accepted
                          </label>
                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="text"
                            name="reasonForNoTreatmentLO"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-2 flex-col">
                      <label htmlFor="alternateTherapyOfferedL">
                        Alternate therapy offered?
                      </label>

                      <Field
                        className="border border-gray-400 p-2 rounded-md"
                        name="alternateTherapyOfferedL"
                        as="select"
                      >
                        <option value="">Select an option</option>

                        {alternateTherapyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {values.alternateTherapyOfferedL === "yes" && (
                      <>
                        <div className="flex gap-2 flex-col">
                          <label htmlFor="typeOfAlternateTherapyL">
                            Type of Alternate therapy offered?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            name="typeOfAlternateTherapyL"
                            as="select"
                          >
                            <option value="">Select an option</option>

                            {alternateTherapyTypes.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="flex gap-2 flex-col">
                          <label htmlFor="alternateTherapyAcceptedL">
                            Alternate therapy Accepted?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            name="alternateTherapyAcceptedL"
                            as="select"
                          >
                            <option value="">Select an option</option>

                            {alternateTherapyOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {(values.whatEye === "right" || values.whatEye === "both") && (
              <>
                <div className="flex gap-2 flex-col">
                  <label htmlFor="treatmentOfferedR">Treatment offered?</label>

                  <Field
                    className="border border-gray-400 p-2 rounded-md"
                    name="treatmentOfferedR"
                    as="select"
                  >
                    <option value="">Select an option</option>

                    {treatmentOffered.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="flex gap-2 flex-col">
                  <label htmlFor="treatmentAcceptedR">
                    Treatment accepted?
                  </label>

                  <Field
                    className="border border-gray-400 p-2 rounded-md"
                    name="treatmentAcceptedR"
                    as="select"
                  >
                    <option value="">Select an option</option>

                    <option value="yes">Yes</option>

                    <option value="no">No</option>
                  </Field>
                </div>

                {values.treatmentAcceptedR === "no" && (
                  <>
                    <div className="flex gap-2 flex-col">
                      <label htmlFor="reasonForNoTreatmentR">Why not?</label>

                      <Field
                        className="border border-gray-400 p-2 rounded-md"
                        name="reasonForNoTreatmentR"
                        as="select"
                      >
                        <option value="">Select an option</option>

                        {reasonsForNoTreatmentOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {values.reasonForNoTreatmentR === "other" && (
                      <>
                        <div className="flex gap-2 flex-col">
                          <label htmlFor="reasonForNoTreatmentRO">
                            State why treatment was not accepted
                          </label>
                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            type="text"
                            name="reasonForNoTreatmentRO"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-2 flex-col">
                      <label htmlFor="alternateTherapyOfferedR">
                        Alternate therapy offered?
                      </label>

                      <Field
                        className="border border-gray-400 p-2 rounded-md"
                        name="alternateTherapyOfferedR"
                        as="select"
                      >
                        <option value="">Select an option</option>

                        {alternateTherapyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {values.alternateTherapyOfferedR === "yes" && (
                      <>
                        <div className="flex gap-2 flex-col">
                          <label htmlFor="typeOfAlternateTherapyR">
                            Type of Alternate therapy offered?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            name="typeOfAlternateTherapyR"
                            as="select"
                          >
                            <option value="">Select an option</option>

                            {alternateTherapyTypes.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="flex gap-2 flex-col">
                          <label htmlFor="alternateTherapyAcceptedR">
                            Alternate therapy Accepted?
                          </label>

                          <Field
                            className="border border-gray-400 p-2 rounded-md"
                            name="alternateTherapyAcceptedR"
                            as="select"
                          >
                            <option value="">Select an option</option>

                            {alternateTherapyOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
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
                  onClick={() => previousStep()}
                  className="cursor-pointer bg-green-600 text-white p-2 flex items-center justify-center mb-2 rounded-md w-[200px] h-[50px] text-center"
                  // disabled={isSubmitting}
                >
                  Back
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white p-2 mb-2 rounded-md w-[200px] h-[50px] "
                  disabled={isSubmitting}
                >
                  Finish
                </button>
              </Space>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(FailedForm);
