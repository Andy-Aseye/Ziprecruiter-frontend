import React from "react";
import styles from "./styles.module.css";
import Leftdiv from "../../../components/Left-div-signup";
import apiRequest from "../../../services/api_request";
import { setUser } from "../../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useAppDispatch } from "../../../store";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const RecruiterSignup = () => {
  interface MyFormValues {
    type: string | any;
    name: string | any;
    organization?: string | any;
    email?: string | any;
    password?: string | any;
    contactNumber?: string | any;
    position?: string | any;
    [key: string]: any;
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    type: "recruiter",
    organization: "",
    contactNumber: "",
    position: "",
  };

  const validationShema = Yup.object().shape<MyFormValues>({
    name: Yup.string().required("Name value is required"),
    type: Yup.string().required("Select role type"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    organization: Yup.string().required("Please state affiliated organization"),
    position: Yup.string().required("Position cannot be left empty"),
    contactNumber: Yup.string().required("Contact number cannot be left empty"),
  });

  const onSubmit = async (
    value: Record<string, unknown>,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const response = await apiRequest({ url: "auth/signup/recruiter", body: value });
      console.log(response);
      console.log(response.message);
      const { email, token, type } = response.data as {
        email: string;
        token: string;
        type: string;
      };
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      localStorage.setItem("type", type);
      dispatch(setUser({ email, token, type }));
      navigate("/myjobs");
      if (!response || !response.ok) {
        throw new Error("Failed to register user");
      }
      resetForm();
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
                onSubmit={onSubmit}
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
                      <label htmlFor="email">Email</label>
                      <Field type="text" id="email" name="email" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="password">Password</label>
                      <Field type="password" id="password" name="password" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="organization">Organization</label>
                      <Field
                        type="text"
                        id="organization"
                        name="organization"
                      />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="organization" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="contactNumber">Contact Number</label>
                      <Field
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                      />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="contactNumber" />
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      <label htmlFor="position">Position</label>
                      <Field type="text" id="position" name="position" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="position" />
                      </div>
                    </div>
                    <button className={styles.btn_submit} type="submit">Create account</button>
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

export default RecruiterSignup;
