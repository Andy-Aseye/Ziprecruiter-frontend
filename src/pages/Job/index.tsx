import React from 'react';
import styles from "./styles.module.css";

interface JobProps {
  title: string;
  company: string;
  jobtype: string;
  maxApplicants: number;
  description: string;
  skillsets: string[];
  salary: number;
}

const Job = ({ title, company, jobtype, maxApplicants, description, skillsets, salary }: JobProps) => {
  return (
    <div className={styles.job_container}>
        <div className={styles.top_panel}>
          <button className={styles.qa_btn}>Quick Apply</button>
        </div>
        <div className={styles.job_body_panel}>
            <div><h3>{title}</h3></div>
            <div><p>{company}</p></div>
            <div><p>{jobtype}</p></div>
            <div><p>$ {salary}</p></div>
            <div><p>{description}</p></div>
        </div>
    </div>
  )
}

export default Job;