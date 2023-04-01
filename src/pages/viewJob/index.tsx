import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { useAppSelector } from "../../store";
// import apiRequest from '../../../services/api_request';
import apiRequest from "../../services/api_request";
import axios from "axios";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../services/axioshelper";

const Viewjob = () => {
  const { id } = useParams();
  const [selectedJobb, setselectedJobb] = useState<any>();

  // const response = apiRequest({url: ``})

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setselectedJobb(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(`/api/jobs/${id}/applications`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(Headers)

      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }

  if (!selectedJobb) {
    return <div>Loading....</div>;
  }

  console.log(selectedJobb);

  const title = selectedJobb?.title || "";
  const organization = selectedJobb?.organization || "";
  const description = selectedJobb?.description || "";
  const duration = selectedJobb?.duration || 0;
  const salary = selectedJobb?.salary || 0;
  const jobType = selectedJobb?.jobType || "";
  const jobId = selectedJobb?._id || "";

  console.log(jobId)

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.container_header}>
          <div className={styles.j_title}>
            <h1>{title}</h1>
          </div>
          <div className={styles.j_org}>
            <h2>{organization}</h2>
          </div>
          <div className={styles.info_pane}>
            <div className={styles.salary}>$ {salary}</div>
            <div>{duration} months</div>
            <div>{jobType}</div>
          </div>
        </div>
        <div className={styles.container_body}>
          <div>
            <p style={{ fontWeight: "700" }}>Job Description</p>
          </div>

          <div className={styles.desc}>{description}</div>
          <div className={styles.btn}>
            <button className={styles.apply_btn} onClick={handleApply}>Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewjob;
