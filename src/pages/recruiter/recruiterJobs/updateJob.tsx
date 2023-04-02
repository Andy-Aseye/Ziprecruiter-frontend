import React, {useState} from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { axiosInstance } from '../../../services/axioshelper';
import styles from "./styles.module.css";
import { IoIosCloseCircle } from "react-icons/io";

interface UpdateJobModalProps {
    id: string;
    onClose: () => void;
    isOpen: boolean;
  }

const UpdateJob: React.FC<UpdateJobModalProps> = ({ id, onClose, isOpen }) => {

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
        title: Yup.string(),
        jobType: Yup.string(),
        salary: Yup.string(),
        location: Yup.string(),
        duration: Yup.string(),
        description: Yup.string(),
    });

    
  const initialValues = {
    title: "",
    skills: [],
    description: "",
    jobType: "",
    duration: 0,
    location: "",
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
      const response = await axiosInstance.put(
        `/api/jobs/${id}`,
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
    <div className={`modal ${isOpen} ? 'is-open': ''`}>
    <div className="modal-content">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h2>Update Job Details</h2>
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
                      <label htmlFor="location">Location</label>
                      <Field type="text" id="location" name="location" />
                      <div className={styles.validate_err}>
                        <ErrorMessage name="location" />
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
                      Update job
                    </button>
                  </Form>
                )}
              </Formik>
    </div>
  </div>
  )
}

export default UpdateJob;