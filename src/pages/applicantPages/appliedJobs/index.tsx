import React, {useEffect, useState} from 'react';
import styles from "./styles.module.css";
import Application from "../../../components/application-tab";
import applicationset from '../../../components/trialApplications';
import axios from "axios";
import { axiosInstance } from '../../../services/axioshelper';

interface Applicationint {
  _id: string;
  title: string;
  status: string;
  jobType: string;
  salary: string;
}



const Myapplications = () => {

  const [applicationlist, setApplicationlist] = useState<Applicationint[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ziprecruiter.onrender.com/api/applications-applicant", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setApplicationlist(response.data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(applicationlist);


  return (
    <div>
        <div className={styles.container_inner}>
            <div className={styles.page_header}>
                <div className={styles.title}><h1>Applied Jobs</h1></div>
                <div className={styles.subtitle}><p>Below are jobs that you have already applied to on ZipRecruiter.</p></div>
            </div>
            <div className={styles.application_list}>
            {applicationlist.map((app) => { return <Application title={app.title} jobType={app.jobType} salary={app.salary}  status={app.status}/>})}
            </div>
        </div>
    </div>
  )
}

// salary={app.salary} jobtype={app.jobtype} organization={app.organization}

export default Myapplications