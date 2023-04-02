import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import UpdateJob from './updateJob';

interface RJobProps {
  id: string;
  title: string;
  jobtype: string;
  location: string;
  salary: number | string;
  skills: string[];
}

const RecruiterJob = ({
  id,
  location,
  title,
  jobtype,
  salary,
  skills,
}: RJobProps) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    console.log(id);
    axios
      .delete(`http://localhost:8080/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    navigate(`/api/jobs/${id}/update-job`);
    // console.log(id);
  };

  const handleViewApp = () => {
    navigate(`/api/jobs/${id}/applications`);
    console.log(id);
  };


  return (
    <div className={styles.job_container}>
      <div className={styles.job_body}>
        <h1>{title}</h1>
        <p>{jobtype}</p>
        <p>$ {salary}</p>
        <p>{location}</p>
        <div className={styles.skills_list}>
          {skills.map((skill) => {
            return (
              <div className={styles.skill_tab} key={skill}>
                {skill}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.actions}>
        <div>
          <button className={styles.view} onClick={handleViewApp}>
            View applicants
          </button>
        </div>
        <div>
          <button className={styles.edit} onClick={handleUpdate}>
            Edit job
          </button>
        </div>
        <div>
          <button className={styles.delete} onClick={handleDelete}>
            Delete job
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJob;
