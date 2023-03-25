import React from 'react';
import styles from "./styles.module.css";
import Womanbg from "../../../assets/woman-bg.png";
import Bulb from "../../../assets/lightbulb.png";

const Addjob = () => {
  return (
    <div className={styles.addjob_container}>
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
            <div className={styles.form_container}>
                <div className={styles.form_header}>
                <h1>Add Job Posting</h1>
                <p>Fill in form to post a job.</p>
                </div>
                <div className={styles.form_body}>
                <form>
                <div className={styles.form_group}>
                <input type="text" name="title" placeholder='Title' />
                </div>
                <div className={styles.form_group}>
                <input type="text" name="skills" placeholder='Skills' />
                </div>
                <div className={styles.form_group}>
                <input type="text" name="description" placeholder='Job description'/>
                </div>
                <div className={styles.form_group}>
                <input type="text" name="jobType" placeholder='Job Type'/>
                </div>
                <div className={styles.form_group}>
                <input type="number" name="Salary" placeholder='Salary'/>
                </div>
                <div className={styles.form_group}>
                <input type="text" name="deadline" placeholder='Appicant Deadline'/>
                </div>
                <div className={styles.form_group}>
                <input type="number" name="title" placeholder='Maximum number of applicants'/>
                </div>
                <button type="submit" className={styles.submit_btn}>Add job</button>
                </form>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Addjob;