import React, { useState } from "react";
import styles from "./styles.module.css";
import Leftdiv from "../../components/Left-div-signup";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import apiRequest from "../../services/api_request";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { setUser } from "../../features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Passwword must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = { email: "", password: "" };

  const onSubmit = async (
    value: Record<string, unknown>,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const response = await apiRequest({ url: "auth/login", body: value });
      const { email, token, type } = response.data as {
        email: string;
        token: string;
        type: string;
      };
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      localStorage.setItem("type", type);
      dispatch(setUser({ email, token, type }));
      if (type === "applicant") {
        navigate("/jobslist");
      } else if (type === "recruiter") {
        navigate("/myjobs");
      }
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
              <h1>Welcome back</h1>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "blue" }}>
                  create account
                </Link>
              </p>
            </div>
            <div className={styles.form_body}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
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
                    <button className={styles.signin_btn}>Sign In</button>
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

export default Login;
