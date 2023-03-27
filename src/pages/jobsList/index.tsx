import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./styles.module.css";
import Job from '../Job';
import jobs from '../../components/trialApi';
import SearchIcon from "../../assets/search.png";
import Chart from "../../assets/zipchart-bg-.png";


const FilterDiv = () => {

  return (
    <div className={styles.filter_pane}>
        <div className={styles.inner_container}>
            <div className={styles.top_bar}>
                <div className={styles.search_job}>
                    <input type='search' placeholder='Job title or keyword' className={styles.search_1}/>
                </div>
                <div className={styles.search_location}>
                    <input type='search' placeholder='Location or remote' className={styles.search_2}/>
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.search_btn}>Search Jobs</button>
                </div>
            </div>
            <div className={styles.bottom_bar}>
                <div className={styles.jobmode}>
                    <select>
                        <option>All Remote/In-person</option>
                        <option>In-Person</option>
                        <option>Remote</option>
                    </select>
                </div>
                <div className={styles.distance}>
                    <select>
                        <option>Any Distance</option>
                        <option>Within 5 Miles</option>
                        <option>Within 10 Miles</option>
                    </select>
                </div>
                <div className={styles.timeposted}>
                    <select>
                        <option>Posted Anytime</option>
                        <option>Within 30 Days</option>
                        <option>Within 10 Days</option>
                    </select>
                </div>
                <div className={styles.salaries}>
                    <select>
                        <option>All Salaries</option>
                        <option>$10,000 - $50,000</option>
                        <option>$50,000+</option>
                    </select>
                </div>
                <div className={styles.employment_type}>
                    <select>
                        <option>All Employment Types</option>
                        <option>Full Time</option>
                        <option>Contract</option>
                        <option>Part Time</option>
                    </select>
                </div>
                <div className={styles.titles_filter}>
                    <select>
                        <option>All Titles</option>
                        <option>Fullstack Developer</option>
                        <option>Frontend Developer</option>
                        <option>Web 3 Developer</option>
                        <option>Ui Designer</option>
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
  )
}

const Jobslist = () => {
    // interface JobProps {
    //     title: any;
    //     maxApplicants: number;
    //     description: string;
    //     skillsets: string[];
    //     salary: number;
    //   }
    return (
        <div className={styles.container}>
            <FilterDiv />
            <div className={styles.main_container}>
            <div className={styles.search_results}>
                <div className={styles.results_header}>
                <h1>Frontend Developer Jobs</h1>
                <p>Jobs within 500 miles of Accra, GH</p>
                </div>
                <div className={styles.results_body}>
                {jobs.map((jobpost) => { return <Job title={jobpost.title} maxApplicants={jobpost.maxApplicants} jobtype={jobpost.jobtype} description={jobpost.description} skillsets={jobpost.skillsets} company={jobpost.company} salary={jobpost.salary} /> })}
                </div>
            </div>
            <div className={styles.info_div}>
            <div className={styles.pay_range}>
                <h3>How Much Do Developer Jobs Pay per Year?</h3>
                <div className={styles.chart}>
                <img src={Chart} alt='chart-img' className={styles.chart_img}/>
                </div>
            </div>
            <div className={styles.search_info}>
                <p>What are the most commonly searched types of Developer jobs?</p>
                <p>The most popular types of Frontend Developer jobs are:</p>
                <ol>
                    <li>Freelance</li>
                    <li>Senior</li>
                    <li>Part Time</li>
                    <li>Associate</li>
                    <li>Entry Level</li>
                </ol>
                <line></line>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Jobslist;