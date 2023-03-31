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
// import axios from "axios";

interface MyFormValues {
  type: string | any;
  email?: string | any;
  password?: string | any;
  resume: File | any;
  coverletter: File | any;
  [key: string]: any;
}

const ApplicantSignup = () => {
  // const token = useAppSelector(state => state.auth.user?.token);
  // console.log({token})

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
    type: "applicant",
    skills: "",
    resume: null,
    coverletter: null,
  };

  const validationShema = Yup.object().shape<MyFormValues>({
    name: Yup.string().required("Name value is required"),
    type: Yup.string().required("Select role type"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    resume: Yup.mixed().required("Resume file is required"),
    coverletter: Yup.mixed().required("Cover letter file is required"),
  });

  const onSubmit = async (
    value: Record<string, unknown>,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const { resume, coverletter, ...formData } = value;
      const resumeFormData = new FormData();
      resumeFormData.append("file", resume as File);
      // spin up a promise request to send both the resume and formdata
      const response = await Promise.all([
        // apiRequest({ url: "auth/signup", body: value }),
        apiRequest({ url: "auth/signup", body: formData }),

        // apiRequest({
        //   url: "upload/resume",
        //   headers: {
        //     "Content-Type": "multipart/form-data;",
        //   },
        //   body: resumeFormData,
        // }),
        apiRequest({
          url: "upload/cover-letter",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: {
            file: coverletter,
          },
        }),

        Axios.post(
          "http://localhost:8080/upload/resume",
          resumeFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
      ]);

      console.log(response);
      const [signupResponse, resumeResponse] = response;

      const { email, token, type } = signupResponse.data as {
        email: string;
        token: string;
        type: string;
      };
      const { url } = resumeResponse.data as { url: string };

      console.log(url, email, token, type);
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      localStorage.setItem("type", type);
      dispatch(setUser({ email, token, type }));
      // navigate("/jobslist");
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  // const [error, setError] = useState({

  // });

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
                      <label htmlFor="type">User type</label>
                      <Field as="select" id="type" name="type">
                        <option value="">-- Select role type --</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="applicant">Applicant</option>
                      </Field>
                      <div className={styles.validate_err}>
                        <ErrorMessage name="type" />
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
                      <label htmlFor="coverletter">Cover letter:</label>
                      <input
                        id="coverletter"
                        name="coverletter"
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "coverletter",
                            event.currentTarget.files?.[0]
                          )
                        }
                      />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="coverletter" />
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

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault()
//   const file = new FormData();
//   file.append("file", formData.resume);
//   console.log(`This is data ${file}`);
//   if (formData) {
//     try {

//         // spin up a promise request to send both the resume and formdata
//         console.log(formData);
//         const values = await Promise.all([
//           apiRequest({url: "auth/signup", body: formData}),
//           // send the request to the documents upload endpoint
//           // apiRequest({url: "upload/resume", headers: {
//           //   "Content-Type": "multipart/form-data;"
//           // }, body: {
//           //   file: data
//           // }})
//           Axios.post("http://localhost:8080/upload/resume", file, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             }}),

//         ])

//         console.log(values)
//         const [signupResponse, resumeResponse] = values;

//         const {email, token, type} = signupResponse.data as {email: string; token: string; type: string};
//         const {url} = resumeResponse.data as {url: string};

//         console.log(url, email, token, type);
//         localStorage.setItem('email', email);
//         localStorage.setItem('token', token);
//         localStorage.setItem('type', type);
//         dispatch(setUser({ email, token, type }));
//         navigate('/jobslist');

//         // const response = await apiRequest({url: "auth/signup", body: formData});
//         // console.log(response.data)
//         // const {email, token, type} = response.data as {email: string; token: string; type: string}

//         // dispatch(setUser(response.data as any));

//     } catch(err: any) {
//       console.log(err)
//       setError(err);
//     }
//   }
// }

// const [formData, setFormData] = useState({
//     type: "applicant",
//     email: "",
//     password: "",
//     name: "",
//     education: "",
//     skills: "",
//     resume: "",
//     profile: "",
//     organization: "",
//     position: "",
//     yearsOfExperience: "",
//     contactNumber: "",

// });
