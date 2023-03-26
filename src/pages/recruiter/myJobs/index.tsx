import React from 'react';
import styles from "./styles.module.css";
import Womanbg from "../../../assets/woman-bg.png";
import Bulb from "../../../assets/lightbulb.png";
import Job from "./"

const Myjobs = () => {
  return (
    <div className={styles.myjob_container}>
    <div className={styles.left_container}>
        <div className={styles.inner_container}>
            <div>
            <img src={Womanbg} alt='woman-bg' className={styles.womanbg}/>
            </div>
            <div className={styles.tips_pane}>
                
            <p> <img src={Bulb} className={styles.tips_img} alt="tips-bulb"/> Tips: Creating posts accurately enhances application matches. List skills required, however applications may not match 100%.</p>
            </div>
        </div>
    </div>
    <div className={styles.right_container}>
    <div >
       <div className={styles.d_container}>
        <div className={styles.d_header}>Jobs</div>
        <div className={styles.d_body}>
            <div className={styles.job_list}>
                <Job />
            </div>
        </div>
       </div>
    </div>
    </div>
</div>
  )
}

export default Myjobs;