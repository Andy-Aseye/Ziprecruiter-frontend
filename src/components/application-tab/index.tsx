import React from 'react';
import styles from "./styles.module.css";


interface ApplicationProps {
    title: string;
    organization: string;
    jobtype: string;
    salary: string | number;
    status: string;
    // skillsets: [string];
}

const index = ({title, organization, jobtype, salary, status}: ApplicationProps) => {




  return (
    <div className={styles.application_container}>
        <div className={styles.application_header}>
            <div><h1>{title}</h1></div>
            <div><h4>{organization}</h4></div>
        </div>
        <div className={styles.application_body}>
            <div><div className={styles.app_label}>Job type:</div><div><p>{jobtype}</p></div></div>
            <div><div className={styles.app_label}>Salary:</div><div><p>$ {salary}</p></div></div>
            <div><div className={styles.app_label}>Status:</div><div><p>{status}</p></div></div>
        </div>
    </div>
  )
}

export default index