import React from 'react';
import styles from "./styles.module.css";
import { useAppDispatch } from '../../store';
import { selectedJob } from '../../features/jobsSlice';
import { useNavigate } from 'react-router-dom';


interface JobProps {
  title: string;
  organization: string;
  jobtype: string;
  maxApplicants: number;
  description: string;
  skillsets: string[];
  salary: number | string;
}

const Job = ({ title, organization, jobtype, maxApplicants, description, skillsets, salary }: JobProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


const handleClick = () => {
  dispatch(selectedJob({Job}));
  localStorage.setItem("title", title);
  localStorage.setItem("salary", salary.toString());
  localStorage.setItem("organization", organization);
  localStorage.setItem("description", description);
  navigate('/job/:id');

}



  return (
    <div className={styles.job_container} onClick={handleClick}>
        <div className={styles.top_panel}>
          <button className={styles.qa_btn}>Quick Apply</button>
        </div>
        <div className={styles.job_body_panel}>
            <div><h3>{title}</h3></div>
            <div><p>{organization}</p></div>
            <div><p>{jobtype}</p></div>
            <div><p>{salary}</p></div>
            <div><p className={styles.desc}>{description}</p></div>
        </div>
    </div>
  )
}

export default Job;