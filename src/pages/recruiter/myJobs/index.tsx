import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Job from "../recruiterJobs/index";
// import jobs from "../../../components/trialApi";
import apiRequest from "../../../services/api_request";
import axios from "axios";
import { Link } from "react-router-dom";


interface Job {
  _id: string;
  title: string;
  skills: string[];
  description: string;
  jobType: string;
  salary: number;
}


const Myjobs = (): JSX.Element => {
  const [jobslist, setJobslist] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/jobs/recruiter", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setJobslist(response.data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(jobslist);

  if (!jobslist || jobslist.length === 0) {
    return <div className={styles.nojob_msg}><h1>No job found</h1><p>Get started by <Link to="/addjob" className={styles.link}>adding jobs</Link></p></div>;
  } else {
    return (
      <div className={styles.myjob_container}>
        <div className={styles.right_container}>
          <div>
            <div className={styles.d_container}>
              <div className={styles.d_header}>
                <h1>Jobs</h1>
              </div>
              <div className={styles.d_body}>
                <div className={styles.job_list}>
                  {jobslist.map((job) => {
                    return (
                      <Job
                        id={job._id}
                        title={job.title}
                        jobtype={job.jobType}
                        salary={job.salary}
                        skills={job.skills}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
};

export default Myjobs;
