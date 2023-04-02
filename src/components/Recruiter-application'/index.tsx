import React from "react";
import { axiosInstance } from "../../services/axioshelper";
import styles from "./styles.module.css";
// import ApplicantInfo from "../applicant-info";

// interface Applicant {
//   name: string;
//   skills: string[];
//   resume: string;
//   education: string;
//   yearsOfExperience: string;
// }

interface Recappint {
  id: string;
  yearsOfExperience: string;
  education: string;
  name: string;
  coverletter: string; 
  resume: string;
  salary: number | string;
  skills: string[];
}

const Recruiterapp = ({ id, name, resume, coverletter, education, yearsOfExperience, skills }: Recappint) => {
  const UpdateStatus = () => {};

  const viewCV = async () => {
    try {
      const response = await axiosInstance.get(`host/resume/${resume}`, {
        responseType: 'blob'
      });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      console.log(error);
    }
  };

  const viewCoverl = async () => {
    try {
      const response = await axiosInstance.get(`/host/cover-letter/${coverletter}`, {
        responseType: 'blob'
      });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(applicant.education)

  return (
    <div id={id} className={styles.application_container}>
      <div className={styles.container_main}>
       <div className={styles.applicant_details}>
       <div className={styles.name}><p style={{color: "black"}}>Name:</p> <p>{name}</p></div>
       <div className={styles.education}><p style={{color: "black"}}>Education:</p> <p>{education}</p></div>
       <div className={styles.yearsOfExperience}><p style={{color: "black"}}>Years of Experience:</p> <p>{yearsOfExperience}</p></div>
       <div>
        <p style={{color: "black"}}>Skills:</p>
       </div>
       <div className={styles.skill_list}>{skills.map((skill) => {return (<div className={styles.skill}>{skill}</div>)})}</div>

       </div>
       <div className={styles.applicant_files}>
        <button onClick={viewCV}>View CV</button>
        <button onClick={viewCoverl}>Cover letter</button>
       </div>

      </div>
      <div className={styles.update_status_buttons}>
        <button className={styles.accept}>Accept</button>
        <button className={styles.shortlist}>Shortlist</button>
        <button className={styles.reject}>Reject</button>
      </div>
    </div>
  );
};

export default Recruiterapp;
