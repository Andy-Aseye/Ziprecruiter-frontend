import React, {useEffect, useState} from 'react';
import styles from "./styles.module.css";
// import { useSelector } from 'react-redux';
// import { useAppSelector } from '../../../store';
import { useAppSelector } from '../../store';
// import apiRequest from '../../../services/api_request';
import apiRequest from '../../services/api_request';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../services/axioshelper';


const Viewjob = () => {

  const {id} = useParams(); 
  const [selectedJobb, setselectedJobb] = useState<any>(); 

  // const response = apiRequest({url: ``})

  useEffect(() => { 
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`/api/jobs/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setselectedJobb(response.data);
      } catch (error) {
        console.error(error)
      }
    }
  fetchJob();
  }, [id]);

  if (!selectedJobb) {
    return <div>Loading....</div>
  }
  

  // axios.post(
  //   `http://localhost:8080/api/jobs/${id}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   }
  // ).then((data): any => {setselectedJobb(data) })


  
  // const selectedJob = useAppSelector((state) => state.job.job);

  // const selectedJob = seletedJobb

  console.log(selectedJobb);

  const title = selectedJobb?.title || "";
  const organization = selectedJobb?.organization || "";
  const description = selectedJobb?.description || "";
  const salary = selectedJobb?.salary || 0;

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