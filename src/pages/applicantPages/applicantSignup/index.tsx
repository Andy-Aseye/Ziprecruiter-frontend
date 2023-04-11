import React, { useState } from "react";
import styles from "./styles.module.css";
import Leftdiv from "../../../components/Left-div-signup";
import apiRequest from "../../../services/api_request";
import { setUser } from "../../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAppDispatch } from "../../../store";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoIosCloseCircle } from "react-icons/io";
import { axiosInstance } from "../../../services/axioshelper";


interface MyFormValues {
  email?: string | any;
  password?: string | any;
  resume: File | any;
  education: string | any;
  yearsOfExperience: string | any;
  coverLetter: File | any;
  [key: string]: any;
}

const ApplicantSignup = () => {
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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    skills: "",
    resume: null,
    coverLetter: null,
    education: "",
    yearsOfExperience: "",
  };

  const validationShema = Yup.object().shape<MyFormValues>({
    name: Yup.string().required("Name value is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    resume: Yup.mixed().required("Resume file is required"),
    coverLetter: Yup.mixed().required("Cover letter file is required"),
    education: Yup.string().required("Education is required"),
    yearsOfExperience: Yup.number().required("Years of experience is required"),
  });

  const onSubmit = async (
    values: Record<string, unknown>,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      console.log(values);
      const {
        name,
        email,
        password,
        education,
        skills,
        yearsOfExperience,
        resume,
        coverLetter,
      } = values;
      const formData = new FormData();
      formData.append("name", name as string);
      formData.append("email", email as string);
      formData.append("password", password as string);
      formData.append("education", education as string);
      formData.append("yearsOfExperience", yearsOfExperience as string);
      formData.append("skills", JSON.stringify(skills));
      formData.append("resume", resume as File);
      formData.append("coverLetter", coverLetter as File);

      const {
        data: { token, type },
      } = await axiosInstance.post<{
        email: string;
        token: string;
        type: string;
      }>("/auth/signup/applicant", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("email", email as string);
      localStorage.setItem("token", token);
      localStorage.setItem("type", type);
      dispatch(setUser({ email: String(email), token, type }));
      navigate("/jobslist");
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.inner_container}>
        <div className={styles.left_container}>
          <Leftdiv />
        </div>
        <div className={styles.right_container}>
          <div className={styles.form_container}>
            <div className={styles.form_header}>
              <h1>Welcome</h1>
              <p>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "blue" }}>
                  sign in
                </Link>
              </p>
            </div>
            <div className={styles.form_body}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationShema}
                onSubmit={(e, options) => onSubmit({ ...e, skills }, options)}
              >
                {(formik) => (
                  <Form>
                    <div className={styles.form_group}>
                      <label htmlFor="name">Name</label>
                      <Field type="text" id="name" name="name" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="education">Education</label>
                      <Field type="text" id="education" name="education" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="education" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="yearsOfExperience">
                        Years of experience
                      </label>
                      <Field
                        type="number"
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                      />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="yearsOfExperience" />
                      </div>
                    </div>

                    <div className={styles.form_group}>
                      <label htmlFor="email">Email</label>
                      <Field type="text" id="email" name="email" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="password">Password</label>
                      <Field type="text" id="password" name="password" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="password" />
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
                    <div className={styles.form_group}>
                      <label htmlFor="resume">Resume:</label>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "resume",
                            event.currentTarget.files?.[0]
                          )
                        }
                      />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="resume" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="coverLetter">Cover letter:</label>
                      <input
                        id="coverLetter"
                        name="coverLetter"
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "coverLetter",
                            event.currentTarget.files?.[0]
                          )
                        }
                      />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="coverLetter" />
                      </div>
                    </div>
                    <button
                      className={styles.btn_submit}
                      disabled={formik.isSubmitting}
                      type="submit"
                    >
                      Create account
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

export default ApplicantSignup;

