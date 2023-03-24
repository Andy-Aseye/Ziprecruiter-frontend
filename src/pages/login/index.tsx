import React, {useState} from 'react';
import styles from "./styles.module.css";
import Leftdiv from '../../components/Left-div-signup';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
});



  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  



  const handleSubmit = () => {

  }


  return (
    <div>
      <div className={styles.inner_container}>
        <div className={styles.left_container}>
          <Leftdiv />
        </div>
        <div className={styles.right_container}>
            <div className={styles.form_container}>
                <div className={styles.form_header}>
                  <h1>Welcome Back!</h1>
                  <p>Sign into your account and let's get started!</p>
                </div>
                <div className={styles.form_body}>
                  <form onSubmit={handleSubmit}>
                  <div className={styles.form_group}>
                      <label>Email:</label>
                      <input name="email" value={formData.email} onChange={handleChange}></input>
                    </div>
                    <div className={styles.form_group}>
                      <label>Password:</label>
                      <input name="password" value={formData.password} onChange={handleChange}></input>
                    </div>
                  </form>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Login