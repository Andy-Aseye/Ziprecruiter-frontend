import React from 'react';
import styles from "./styles.module.css";
import { useAppDispatch } from '../../store';
import { selectedJob } from '../../features/jobsSlice';
import { useNavigate } from 'react-router-dom';


interface JobProps {
  id: string;
  title: string;
  location: String;
  jobType: string;
  description: string;
  skills: string[];
  salary: number | string;
}
// organization,
// organization: string;
  // maxApplicants: number;

const Job = ({id, location, title,  jobType, description, skills, salary }: JobProps) => {

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();


const handleClick = () => {
  // dispatch(selectedJob({Job}));
  // localStorage.setItem("title", title);
  // localStorage.setItem("salary", salary.toString());
  // // localStorage.setItem("organization", organization);
  // localStorage.setItem("description", description);
  navigate(`api/jobs/${id}`);
  console.log(id)

}



  return (
    <div className={styles.job_container} onClick={handleClick}>
        <div className={styles.top_panel}>
          <button className={styles.qa_btn}>Quick Apply</button>
        </div>
        <div className={styles.job_body_panel}>
            <div><h3>{title}</h3></div>
            {/* <div><p>{organization}</p></div> */}
            <div><p>{jobType}</p></div>
            <div><p>$ {salary}</p></div>
            <div className={styles.skills_list}>{skills.map((skill) => {return (<div className={styles.skill_tab} key={skill}>{skill}</div>)})}</div>
            <div><p className={styles.desc}>{description}</p></div>
        </div>
    </div>
  )
}

export default Job;