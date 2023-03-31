import React, { memo, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { saveStageOne } from "../actions/userAction";
import Axios from "../api/auth";
import { useState } from "react";
import { Spin } from "antd";

const ethnicityOptions = ["Hausa", "Igbo", "Yoruba", "Other"];
const hadOfGlaucoma = ["Yes", "No"];
const relativeWithBlindness = ["Yes", "No"];
const eductionLevel = [
  "None/illetrate",
  "Primary School only",
  "Some secondary school",
  "Completed secondary school",
  "Some university or more",
];

const diagnosisGlucoma = [
  "Primary open-angle glaucoma",
  "Primary angle-closure glaucoma",
  "pseudoexfoliation glaucoma",
  "Uveitic/inflammatory glaucoma",
  "Unknown",
  "Other",
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const travelTimeOptions = [
  { label: "Less than 0.5 hours", value: "< 0.5 hour" },
  { label: "0.5 to less than 1 hour", value: "0.5 < 1 hour" },
  { label: "1 to less than 3 hour", value: "1 < 3 hour" },
  { label: "3 to less than 8 hour", value: "3 < 8 hour" },
  { label: "8 to less than 24 hour", value: "8 < 24 hour" },
  { label: "24 or more hour", value: "24+ hour" },
];

const hobbiesOptions = [
  "Reading",
  "Gaming",
  "Exercising",
  "Cooking",
  "Traveling",
];

const getStageOne = async (id) => {
  const res = await Axios.get("/user/stageOne/" + id);
  return res.data;
};

const SubjectForm = ({ nextStep, id }) => {
  const [initialValues, setInitialValues] = useState({});

  if (id) {
    useEffect(() => {
      getStageOne(id).then((res) => {
        setInitialValues(res);
      });
    }, []);
  } else {
    useEffect(() => {
      setInitialValues({
        number: Number(""),
        ethnicity: "",
        ehnicityO: "",
        gender: "",
        travelTime: "",
        domicile: "",
        education: "",
        glucoma: "",
        glucomaO: "",
        hadOfGlaucoma: "",
        relativeWithBlindness: "",
        //   hobbies: [],
      });
    }, []);
  }

  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    dispatch(saveStageOne(values));
    nextStep();
  };
  return Object.keys(initialValues).length < 1 ? (
    <div className="flex h-screen w-full items-center justify-center">
      <Spin />
    </div>
  ) : (
    <div className="w-full md:my-[100px] mt-[100px] md:px-[100px] px-5">
      <h1 className="text-2xl font-bold mb-4 uppercase mt-5">Subject Data</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="number" className="mb-2 font-bold">
                Serial Number
              </label>
              <Field
                type="number"
                id="number"
                name="number"
                placeholder="Enter a number"
                className="border border-gray-400 p-2 rounded-md"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="ethnicity" className="mb-2 font-bold">
                Ethnicity
              </label>
              <Field
                as={"select"}
                id="ethnicity"
                name="ethnicity"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select an ethnicity</option>
                {ethnicityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="ethnicity"
                component="p"
                className="text-red-500"
              />
            </div>
            {values.ethnicity === "Other" && (
              <div className="flex flex-col">
                <label htmlFor="number" className="mb-2 font-bold">
                  Ethnicity
                </label>
                <Field
                  type="text"
                  id="ethnicity"
                  name="ethnicityO"
                  placeholder="Enter Enthnicity"
                  className="border border-gray-400 p-2 rounded-md"
                />
                <ErrorMessage
                  name="number"
                  component="p"
                  className="text-red-500"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="gender" className="mb-2 font-bold">
                Gender
              </label>
              <Field
                as={"select"}
                id="gender"
                name="gender"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select a gender</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="gender"
                component="p"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="travelTime" className="mb-2 font-bold">
                Travel Time
              </label>
              <Field
                as={"select"}
                id="travelTime"
                name="travelTime"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select a travel time</option>
                {travelTimeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="travelTime"
                component="p"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="domicile" className="mb-2 font-bold">
                Place of Domicile
              </label>
              <Field
                type="text"
                id="domicile"
                name="domicile"
                placeholder="Enter your domicile"
                className="border border-gray-400 p-2 rounded-md"
              />
              <ErrorMessage
                name="domicile"
                component="p"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="ethnicity" className="mb-2 font-bold">
                Education Level
              </label>
              <Field
                as={"select"}
                id="education"
                name="education"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select Education Level</option>
                {eductionLevel.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="education"
                component="p"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="ethnicity" className="mb-2 font-bold">
                Glaucoma diagnosis
              </label>
              <Field
                as={"select"}
                id="glucoma"
                name="glucoma"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select glaucoma diagnosis</option>
                {diagnosisGlucoma.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="glucoma"
                component="p"
                className="text-red-500"
              />
            </div>

            {values.glucoma === "Other" && (
              <div className="flex flex-col">
                <label htmlFor="number" className="mb-2 font-bold">
                  Ethnicity
                </label>
                <Field
                  type="text"
                  id="glucoma"
                  name="glucomaO"
                  placeholder="Enter Enthnicity"
                  className="border border-gray-400 p-2 rounded-md"
                />
                <ErrorMessage
                  name="number"
                  component="glucoma"
                  className="text-red-500"
                />
              </div>
            )}
            {/* <div className="flex flex-col">
              <label htmlFor="hobbies" className="mb-2 font-bold">
                Hobbies
              </label>
              <Field
                as={Select}
                multiple
                id="hobbies"
                name="hobbies"
                className="border border-gray-400 p-2 rounded-md"
              >
                {hobbiesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="hobbies"
                component="p"
                className="text-red-500"
              />
            </div> */}
            <div className="flex flex-col">
              <label htmlFor="hadOfGlaucoma" className="mb-2 font-bold">
                Has subject heard of Glaucoma prior to diagnosis
              </label>
              <Field
                as={"select"}
                id="hadOfGlaucoma"
                name="hadOfGlaucoma"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">
                  Has subject heard of Glaucoma prior to diagnosis
                </option>
                {hadOfGlaucoma.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="hadOfGlaucoma"
                component="p"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="hadOfGlaucoma" className="mb-2 font-bold">
                Does Subject have relative with Blindness
              </label>
              <Field
                as={"select"}
                id="relativeWithBlindness"
                name="relativeWithBlindness"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">
                  Does Subject have relative with Blindness
                </option>
                {relativeWithBlindness.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="relativeWithBlindness"
                component="p"
                className="text-red-500"
              />
            </div>
            <div className="flex justify-end ml-auto w-full">
              <button
                type="submit"
                className="bg-green-600 text-white p-2 mb-2 rounded-md w-[200px] h-[50px] "
                disabled={isSubmitting}
              >
                Next
              </button>
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

export default memo(SubjectForm);
