import React, { useState } from 'react';
import styles from "./styles.module.css";
import Leftdiv from '../../components/Left-div-signup';
import apiRequest from '../../services/api_request';
import { useDispatch } from 'react-redux';
import { setUser } from "../../features/userSlice";
import { Navigate } from 'react-router-dom';
import Axios from 'axios';


const Signup = () => {

  const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        type: "applicant",
        email: "",
        password: "",
        name: "",
        education: "",
        skills: "",
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
    
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, files } = event.target;
      if (files) {
        setFormData(prevState => ({
          ...prevState,
          [name]: files[0],
        }));
      }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const file = new FormData();
      file.append("file", formData.resume);
      console.log(`This is data ${file}`);
      if (formData) {
        try {
          
            // spin up a promise request to send both the resume and formdata
            console.log(formData);
            const values = await Promise.all([
              apiRequest({url: "auth/signup", body: formData}),
              // send the request to the documents upload endpoint
              // apiRequest({url: "upload/resume", headers: {
              //   "Content-Type": "multipart/form-data;"
              // }, body: {
              //   file: data
              // }})
              Axios.post("http://localhost:8080/upload/resume", file, {
                headers: {
                  "Content-Type": "multipart/form-data",
                }}),
            
            ])

            console.log(values)
            const [signupResponse, resumeResponse] = values;

            const {email, token, type} = signupResponse.data as {email: string; token: string; type: string};
            const {url} = resumeResponse.data as {url: string};
            

            console.log(url, email, token, type);
            <Navigate to="/jobslist"/>
              

             
            

            // const response = await apiRequest({url: "auth/signup", body: formData});
            // console.log(response.data)
            // const {email, token, type} = response.data as {email: string; token: string; type: string}
          
            // dispatch(setUser(response.data as any));
           


        } catch(err: any) {
          console.log(err)
          setError(err);
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
                      <input name="position" placeholder='Current position' onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Contact Number:</label>
                      <input name="contactNumber" placeholder='Contact Number' value={formData.contactNumber} onChange={handleChange}></input>
                    </div>
                    </> : null}
                    {formData.type === "applicant" ? <>
                    <div className={styles.form_group}>
                      <label>Profile:</label>
                      <input name="profile" type='file' placeholder='Profile' onChange={handleFileChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Education:</label>
                      <input type="number" name="education" placeholder="Year of Graduation" value={formData.education} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Skills:</label>
                      <input name="skills" placeholder="Primary skill" value={formData.skills} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      {/* <label>Years of Experience:</label> */}
                      <input placeholder="How many years of experience in your field?" name='yearsOfExperience'  type='number' value={formData.yearsOfExperience} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label className={styles.file_label}>Resume: (.pdf files only)</label>
                      <input type='file' name='resume' onChange={handleFileChange}></input>
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