import React, {useEffect, useState} from 'react';
import styles from "./styles.module.css";
import { axiosInstance } from '../../../services/axioshelper';
import Recruiterapp from '../../../components/Recruiter-application\'';
import { useParams } from 'react-router-dom';


// interface Applicant {
//   name: string;
//   skills: string[];
//   resume: string;
//   education: string;
//   yearsOfExperience: string;
// }


interface Rapplicationint {
  _id: string;
  title: string;
  status: string;
  salary: string;
  skills: [string];
  name: string;
  resume: string;
  coverletter: string;
  education: string;
  yearsOfExperience: string;
  applicant: [];
  location: string;
}


const Recruiterapplications = ():JSX.Element => {

  const { id} = useParams();

  // const [applicationlist, setApplicationlist] = useState<Rapplicationint[]>([]);
  const [applicantInfo , setApplicantInfo] = useState<Rapplicationint[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // api/jobs/${id}/applications
      try {
        const response = await axiosInstance.get(`api/jobs/${id}/applications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          // console.log(response)

          if (response.data) {
            // setApplicationlist(response.data);
        // setApplicantInfo(applicantData);

        const applicantData = response.data.flatMap((app: { applicant: any[]; }) => app.applicant.map((applicant) => ({
          name: applicant.name,
          skills: applicant.skills,
          resume: applicant.resume,
          education: applicant.education,
          yearsOfExperience: applicant.yearsOfExperience,
        })));
        setApplicantInfo(applicantData);
          }
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.log("No job appli");
      }
    };
    fetchData();
  }, []);

console.log(applicantInfo);







  return (
    <div>
        <div className={styles.container_inner}>
            <div className={styles.page_header}>
                <div className={styles.title}><h1>Applied Jobs</h1></div>
                <div className={styles.subtitle}><p>Below are applications to your job post.</p></div>
            </div>
            <div className={styles.application_list}>
            {applicantInfo.map((app) => { return <Recruiterapp id={app._id} education={app.education} coverletter={app.coverletter} name={app.name} resume={app.resume} skills={app.skills} yearsOfExperience={app.yearsOfExperience}  salary={app.salary}/>})}
            </div>
        </div>
    </div>
  )
}

export default Recruiterapplications;