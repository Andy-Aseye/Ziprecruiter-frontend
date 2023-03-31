import React, {useEffect, MouseEventHandler} from 'react';
import styles from "./styles.module.css";
import Logo from "../../assets/ziprecuiter.png";
// import { useSelector, } from 'react-redux';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { clearUser } from '../../features/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // @ts-ignore
  const user = useAppSelector(state => state.auth.user);
  // console.log({user});

  const handleLogout: MouseEventHandler<HTMLDivElement> = (event) => {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("email");
      console.log(localStorage.length)
      dispatch(clearUser());
      navigate("/signup");

  }

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_logo}>
        <img src={Logo} alt='' className={styles.logo_img}/>
      </div>
      <div className={styles.nav_links}>
        {user?.type ? (
          user.type === "recruiter"? (
            <div className={styles.nav_list}>
            <Link to="/home"><div>Home</div></Link>
             <Link to="/addjob"><div>Post a Job</div></Link>
             <Link to="/myjobs"><div>My Jobs</div></Link>
            <Link to="/profile"><div>Profile</div></Link>
            <Link to="/logout"><div>Logout</div></Link>
           </div>
          ) : (<div className={styles.nav_list}>
           <Link to="/home"><div>Home</div></Link>
           <Link to="/jobslist"><div>Jobs</div></Link>
          <Link to="/myapplications"><div>My Applications</div></Link>
        <Link to=""><div>Profile</div></Link>
          <div onClick={handleLogout} className={styles.logout_btn}>Logout</div>
          </div>)
        ) : ( "") 
        }
      </div>
    </div>
  )
}

export default Navbar;


// user.type === "recruiter" ? (
//   <>
//   <Link to="/home"><div>Home</div></Link>
//   <Link to="/addjob"><div>Post a Job</div></Link>
//   <Link to="/myjobs"><div>My Jobs</div></Link>
//   <Link to="/profile"><div>Profile</div></Link>
//   <Link to="/logout"><div>Logout</div></Link>
//   </>
// ) : (
//   <>
//   <Link to=""><div>Home</div></Link>
//   <Link to=""><div>My Applications</div></Link>
//   <Link to=""><div>Profile</div></Link>
//   <Link to=""><div>Logout</div></Link>
//   </>
// ) : (
//   <>
//   <Link to=""><div>About</div></Link>
//   <Link to=""><div>Sign In</div></Link>
//   </>
