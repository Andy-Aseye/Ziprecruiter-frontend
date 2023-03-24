import React, { useState } from 'react';
import styles from "./styles.module.css";
import Leftdiv from '../../components/Left-div-signup';
import apiRequest from '../../services/api_request';

const Signup = () => {

    const [formData, setFormData] = useState({
        type: "applicant",
        email: "",
        password: "",
        name: "",
        education: [],
        skills: [],
        resume: "",
        profile: "",
        organization: "",
        position: "",
        yearsOfExperience: "",
        contactNumber: "",

        
    });

    const [error, setError] = useState({

    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
    



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (formData) {
        try {
            const response = await apiRequest({url: "signup", body: formData});
            console.log(response)
        } catch(err) {
          console.log(err)
        }
      }
    }

  return (
    <div>
        <div className={styles.inner_container}>
            <div className={styles.left_container}>
              <Leftdiv/>
            </div>
            <div className={styles.right_container}>
              <div className={styles.form_container}>
                <div className={styles.form_header}>
                  <h1>Welcome</h1>
                  <p>Create your account and let's get the task done</p>
                </div>
                <div className={styles.form_body}>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                      <label>What describes you?</label>
                      <div className={styles.form_group_pair}>
                      <label>
                    <input type="radio" name="type" value="applicant" checked={formData.type === "applicant"} onChange={handleChange} />
                        Applicant
                    </label>
                    <label>
                    <input type="radio" name="type" value="recruiter" checked={formData.type === "recruiter"} onChange={handleChange} />
                        Recruiter
                    </label>
                      </div>
                    </div>
                    <div className={styles.form_group}>
                      {/* <label>Email:</label> */}
                      <input name="email" type='email' placeholder='example@gmail.com' value={formData.email} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      {/* <label>Name:</label> */}
                      <input name="name" type="text" placeholder='Enter name' value={formData.name} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      {/* <label>Password:</label> */}
                      <input name='password' type='password' placeholder='Enter password' value={formData.password} onChange={handleChange}></input>
                    </div>
                    {formData.type === "recruiter" ? <>
                    <div className={styles.form_group}>
                      <label>Organization:</label>
                      <input name='organization' value={formData.organization} placeholder='Affiliated Organization' onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Position:</label>
                      <input name="position" placeholder='Current position' value={formData.position} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Contact Number:</label>
                      <input name="contactNumber" placeholder='Contact Number' value={formData.contactNumber} onChange={handleChange}></input>
                    </div>
                    </> : null}
                    {formData.type === "applicant" ? <>
                    <div className={styles.form_group}>
                      <label>Profile:</label>
                      <input name="profile" type='file' placeholder='Profile' value={formData.profile} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Education:</label>
                      <input name="education" placeholder="Education" value={formData.education} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Skills:</label>
                      <input name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      {/* <label>Years of Experience:</label> */}
                      <input placeholder="How many years of experience in your field?" name='yearsOfExperience'  type='number' value={formData.yearsOfExperience} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Resume:</label>
                      <input type='file' name='resume' value={formData.resume} onChange={handleChange}></input>
                    </div>
                    </> : null}
                    {}
                    <button className={styles.btn_submit}>Create account</button>
                  </form>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Signup;