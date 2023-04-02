import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import Job from "../../../components/Job";
import jobs from "../../../components/trialApi";
import SearchIcon from "../../assets/search.png";
import Chart from "../../../assets/zipchart-bg-.png";
import apiRequest from "../../../services/api_request";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../store";
import { axiosInstance } from "../../../services/axioshelper";

const Jobslist = () => {
  // Reminder: Implement exporting of interface.
  interface Job {
    _id: string;
    title: string;
    skills: string[];
    location: String;
    description: string;
    jobType: string;
    salary: number;
  }

  const [jobslist, setJobslist] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Initial rendering of jobs on page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/jobs", {
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

  // Rendering of jobs
  // const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [distance, setDistance] = useState("any");
  const [salary, setSalary] = useState("all");
  const [employmentType, setEmploymentType] = useState("all");

  const handleSearch = async () => {

    try {
        const queryParams = new URLSearchParams({
            title,
            location,
            jobType,
            distance,
            salary,
            employmentType,
          });
      const response = await axiosInstance.get(`/api/jobs?${queryParams.toString()}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.status === 200) {
        setFilteredJobs(response.data);
        console.log(filteredJobs);
      } else {
        console.error("Failed to fetch jobs");
      }
    }

    catch (error) {
        console.error(error)
    }
    // send queryParams to server using fetch or axios
  };

  // const {joblist} = useAppSelector();
  return (
    <div className={styles.container}>
      <div className={styles.filter_pane}>
        <div className={styles.inner_container}>
          <div className={styles.top_bar}>
            <div className={styles.search_job}>
              <input
                type="search"
                placeholder="Job title or keyword"
                className={styles.search_1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.search_location}>
              <input
                type="search"
                placeholder="Location or remote"
                className={styles.search_2}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className={styles.btn_container}>
              <button className={styles.search_btn} onClick={handleSearch}>
                Search Jobs
              </button>
            </div>
          </div>
          <div className={styles.bottom_bar}>
            <div className={styles.jobmode}>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="all">All Remote/In-person</option>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className={styles.distance}>
              <select
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              >
                <option value="any">Any Distance</option>
                <option value="within-5">Within 5 Miles</option>
                <option value="within-10">Within 10 Miles</option>
              </select>
            </div>
            <div className={styles.salaries}>
              <select
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value="all">All Salaries</option>
                <option value="10-50">$10,000 - $50,000</option>
                <option value="50+">$50,000+</option>
              </select>
            </div>
            <div className={styles.employment_type}>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option value="all">All Employment Types</option>
                <option value="fulltime">Full Time</option>
                <option value="contract">Contract</option>
                <option value="parttime">Part Time</option>
              </select>
            </div>
            <div className={styles.companies}>
              <select>
                <option>All Companies</option>
                <option>Spotify</option>
                <option>Amazon</option>
                <option>Ghacem</option>
                <option>Google</option>
                <option>Bank of America</option>
                <option>TikTok</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main_container}>
        <div className={styles.search_results}>
          <div className={styles.results_header}>
            <h1>Frontend Developer Jobs</h1>
            <p>Jobs within 500 miles of Accra, GH</p>
          </div>
          <div className={styles.results_body}>
            {jobslist.map((jobpost) => {
              return (
                <Job
                  location={jobpost.location}
                  id={jobpost._id}
                  title={jobpost.title}
                  description={jobpost.description}
                  jobType={jobpost.jobType}
                  skills={jobpost.skills}
                  salary={jobpost.salary}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.info_div}>
          <div className={styles.pay_range}>
            <h3>How Much Do Developer Jobs Pay per Year?</h3>
            <div className={styles.chart}>
              <img src={Chart} alt="chart-img" className={styles.chart_img} />
            </div>
          </div>
          <div className={styles.search_info}>
            <p>What are the most commonly searched types of Developer jobs?</p>
            <p className={styles.sub_header}>
              The most popular types of Frontend Developer jobs are:
            </p>
            <ol>
              <li>Freelance</li>
              <li>Senior</li>
              <li>Part Time</li>
              <li>Associate</li>
              <li>Entry Level</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobslist;

// maxApplicants={jobpost.maxApplicants} jobType={jobpost.jobType} organization={jobpost.organization}
