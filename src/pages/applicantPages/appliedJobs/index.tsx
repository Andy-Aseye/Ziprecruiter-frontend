import React from 'react';
import styles from "./styles.module.css";
import Application from "../../../components/application-tab";
import applicationset from '../../../components/trialApplications';

const Myapplications = () => {
  return (
    <div>
        <div className={styles.container_inner}>
            <div className={styles.page_header}>
                <div className={styles.title}><h1>Applied Jobs</h1></div>
                <div className={styles.subtitle}><p>Below are jobs that you have already applied to on ZipRecruiter.</p></div>
            </div>
            <div className={styles.application_list}>
            {applicationset.map((app) => { return <Application title={app.title} salary={app.salary} jobtype={app.jobtype} organization={app.organization} status={app.status}/>})}
            </div>
        </div>
    </div>
  )
}

export default Myapplications