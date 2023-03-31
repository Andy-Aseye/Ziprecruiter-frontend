import React from 'react';
import styles from "./styles.module.css";
// import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../store';


const Viewjob = () => {
  const selectedJob = useAppSelector((state) => state.job.job);

  const title = selectedJob?.title || "";
  const organization = selectedJob?.organization || "";
  const description = selectedJob?.description || "";
  const salary = selectedJob?.salary || 0;

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.container_header}>
                <div className={styles.j_title}><h1>{title}</h1></div>
                <div className={styles.j_org}><h2>{organization}</h2></div>
                <div className={styles.info_pane}>
                <div className={styles.salary}>$ {salary}</div>
                </div>
            </div>
            <div className={styles.container_body}>
              <div><p>Job Description</p></div>
                <div className={styles.desc}>{description}</div>
                <div className={styles.btn}><button className={styles.apply_btn}>Apply Now</button></div>
            </div>
        </div>
    </div>
  )
}

export default Viewjob