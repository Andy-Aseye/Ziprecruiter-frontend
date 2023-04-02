import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { axiosInstance } from "../../../services/axioshelper";
import Recruiterapp from "../../../components/Recruiter-application'";
import { useParams } from "react-router-dom";

interface Rapplicationint {
  id: string;
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

const Recruiterapplications = (): JSX.Element => {
  const { id } = useParams();

  const [applicantInfo, setApplicantInfo] = useState<Rapplicationint[]>([]);

  const [applicationId, setApplicationId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `api/jobs/${id}/applications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);

          if (response.data) {
            const applicId = response.data.map(
              (app: { _id: any; applicant: any }) => {
                const { _id: id, applicant } = app;
                return { id };
              }
            );

            setApplicationId(applicId[0].id);

            const applicantData = response.data.flatMap(
              (app: { applicant: any[] }) =>
                app.applicant.map((applicant) => ({
                  name: applicant.name,
                  skills: applicant.skills,
                  resume: applicant.resume,
                  education: applicant.education,
                  yearsOfExperience: applicant.yearsOfExperience,
                }))
            );
            setApplicantInfo(applicantData);
          }
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.log("No job application");
      }
    };
    fetchData();
  }, []);

  console.log(applicantInfo);
  console.log(applicationId);

  return (
    <div>
      <div className={styles.container_inner}>
        <div className={styles.page_header}>
          <div className={styles.title}>
            <h1>Applied Jobs</h1>
          </div>
          <div className={styles.subtitle}>
            <p>Below are applications to your job post.</p>
          </div>
        </div>
        <div className={styles.application_list}>
          {applicantInfo.map((app) => {
            return (
              <Recruiterapp
                id={applicationId}
                education={app.education}
                coverletter={app.coverletter}
                name={app.name}
                resume={app.resume}
                skills={app.skills}
                yearsOfExperience={app.yearsOfExperience}
                salary={app.salary}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recruiterapplications;
