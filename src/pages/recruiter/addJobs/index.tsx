import React, { useState } from "react";
import styles from "./styles.module.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoIosCloseCircle } from "react-icons/io";
import Womanbg from "../../../assets/woman-bg.png";
import Bulb from "../../../assets/lightbulb.png";
import apiRequest from "../../../services/api_request";
import axios from "axios";

const Addjob = () => {
  const [skill, setSkill] = useState<string>("");
  const [skills, setSkills] = useState<Array<string>>([]);

  const removeSkill = (name: string) => {
    setSkills((skillArray) => skillArray.filter((skill) => skill !== name));
  };

  const addSkill = () => {
    if (skill === "") return;
    const exist = skills.find((e) => e.toLowerCase() === skill.toLowerCase());
    if (exist) return alert("skill already exist");
    setSkills((skillArray) => [...skillArray, skill]);
    setSkill("");
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title input is required"),
    skills: Yup.array().of(Yup.string().required("Skills input is required")),
    description: Yup.string().required("Description is required"),
    jobType: Yup.string().required("Please list type of job"),
    duration: Yup.number().required("State duration of job"),
    salary: Yup.number().required("State salary offer"),
  });

  const initialValues = {
    title: "",
    skills: [],
    description: "",
    jobType: "",
    duration: 0,
    salary: 0,
  };

  const onSubmit = async (
    value: Record<string, unknown>,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const response = await axios.post(
        "https://ziprecruiter.onrender.com/api/jobs",
        value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      // if (!response || !response.ok) {
      //   throw new Error("Failed to register user");
      // }
      resetForm();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.addjob_container}>
      <div className={styles.left_container}>
        <div className={styles.inner_container}>
          <div>
            <img src={Womanbg} alt="woman-bg" className={styles.womanbg} />
          </div>
          <div className={styles.tips_pane}>
            <p>
              {" "}
              <img
                src={Bulb}
                className={styles.tips_img}
                alt="tips-bulb"
              />{" "}
              Tips: Creating posts accurately enhances application matches. List
              skills required, however applications may not match 100%.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.right_container}>
        <div>
          <div className={styles.form_container}>
            <div className={styles.form_header}>
              <h1>Add Job Posting</h1>
              <p>Fill in form to post a job.</p>
            </div>
            <div className={styles.form_body}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e, options) => onSubmit({ ...e, skills }, options)}
              >
                {({ values, errors, touched, isSubmitting }) => (
                  <Form>
                    <div className={styles.form_grp}>
                      <label htmlFor="title">Job Title</label>
                      <Field type="text" id="title" name="title" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="title" />
                      </div>
                    </div>

                    <div className={styles.form_grp}>
                      <label htmlFor="skills">Skills</label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginBottom: 10,
                        }}
                      >
                        {skills.map((data, index) => (
                          <span
                            style={{
                              backgroundColor: "rgba(0,0,0,0.1)",
                              display: "flex",
                              alignItems: "center",
                              fontSize: 12,
                              borderRadius: 10,
                              padding: "4px 10px",
                              gap: 15,
                              marginRight: 10,
                            }}
                            key={index}
                          >
                            {data}{" "}
                            <IoIosCloseCircle
                              size={20}
                              onClick={() => removeSkill(data)}
                            />
                          </span>
                        ))}
                      </div>

                      <Field
                        type="text"
                        id="skills"
                        name="skills"
                        value={skill}
                        onChange={(e: any) => setSkill(e.target.value)}
                        required={false}
                      />

                      <button
                        type="button"
                        className={styles.submit_btn}
                        style={{
                          borderRadius: 13,
                          backgroundColor: "black",
                          fontSize: 11,
                          padding: "5px 4px",
                          width: "20%",
                        }}
                        onClick={() => addSkill()}
                      >
                        Add skill
                      </button>
                      <div className={styles.validate_err}>
                        <ErrorMessage name="skills" />
                      </div>
                    </div>

                    <div className={styles.form_grp}>
                      <label htmlFor="description">Job description</label>
                      <Field type="text" id="description" name="description" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="description" />
                      </div>
                    </div>
                    <div className={styles.form_grp}>
                      <label htmlFor="job Type">Job type</label>
                      <Field type="text" id="title" name="jobType" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="jobType" />
                      </div>
                    </div>
                    <div className={styles.form_grp}>
                      <label htmlFor="job Type">Duration</label>
                      <Field type="number" id="duration" name="duration" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="duration" />
                      </div>
                    </div>
                    <div className={styles.form_grp}>
                      <label htmlFor="salary">Salary</label>
                      <Field type="text" id="salary" name="salary" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="salary" />
                      </div>
                    </div>
                    <button type="submit" className={styles.submit_btn}>
                      Add job
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addjob;
