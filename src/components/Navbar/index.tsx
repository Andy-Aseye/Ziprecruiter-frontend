// import React, {useEffect, MouseEventHandler} from 'react';
// import styles from "./styles.module.css";
// import Logo from "../../assets/ziprecuiter.png";
// // import { useSelector, } from 'react-redux';
// import {Link, redirect} from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { useAppSelector, useAppDispatch } from '../../store';
// import {useDispatch} from "react-redux";
// import { clearUser } from '../../features/userSlice';

// const Navbar = () => {
//   const navigate = useNavigate();
//   // const dispatch = useAppDispatch();
//   const dispatch = useDispatch();

  
//   // @ts-ignore
//   const user = useAppSelector(state => state.auth.user);
//   // console.log({user});

//   const handleLogout: MouseEventHandler<HTMLDivElement> = (event) => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("type");
//       localStorage.removeItem("email");
//       console.log(localStorage.length)
//       dispatch(clearUser());
//       navigate("/login");
//       // redirect("/login")
//   }

//   return (
//     <div className={styles.nav_container}>
//       <div className={styles.nav_logo}>
//         <img src={Logo} alt='' className={styles.logo_img}/>
//       </div>
//       <div className={styles.nav_links}>
//         {user?.type ? (
//           user.type === "recruiter"? (
//             <div className={styles.nav_list}>
//             <Link to="/home"><div>Home</div></Link>
//              <Link to="/addjob"><div>Post a Job</div></Link>
//              <Link to="/myjobs"><div>My Jobs</div></Link>
//             <Link to="/profile"><div>Profile</div></Link>
//             <div onClick={handleLogout} className={styles.logout_btn}>Logout</div>
//            </div>
//           ) : (<div className={styles.nav_list}>
//            <Link to="/home"><div>Home</div></Link>
//            <Link to="/jobslist"><div>Jobs</div></Link>
//           <Link to="/myapplications"><div>My Applications</div></Link>
//         <Link to=""><div>Profile</div></Link>
//           <div onClick={handleLogout} className={styles.logout_btn}>Logout</div>
//           </div>)
//         ) : ( "") 
//         }
//       </div>
//     </div>
//   )
// }

// export default Navbar;



import { Link, redirect } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store';
// import { logout } from "../features/auth/authSlice";
import Logo from "../../assets/ziprecuiter.png";
import styles from "./styles.module.css";
import { clearUser } from "../../features/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("email");
       redirect("/")
       console.log(localStorage.length)
  };

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_logo}>
        <img src={Logo} alt='' className={styles.logo_img}/>
      </div>
      <div className={styles.nav_links}>
        {!user?.type ? (
          <div className={styles.nav_list}>
            <Link to="/"><div>Home</div></Link>
            <Link to="/login"><div>Login</div></Link>
            <Link to="/recruiter-signup"><div>Recruiter signup</div></Link>
            <Link to="/applicant-signup"><div>Applicant signup</div></Link>
          </div>
        ) : (
          user.type === "recruiter"? (
            <div className={styles.nav_list}>
              <Link to="/home"><div>Home</div></Link>
              <Link to="/addjob"><div>Post a Job</div></Link>
              <Link to="/myjobs"><div>My Jobs</div></Link>
              <Link to="/profile"><div>Profile</div></Link>
              <div onClick={handleLogout} className={styles.logout_btn}>Logout</div>
            </div>
          ) : (<div className={styles.nav_list}>
            <Link to="/home"><div>Home</div></Link>
            <Link to="/jobslist"><div>Jobs</div></Link>
            <Link to="/myapplications"><div>My Applications</div></Link>
            <Link to=""><div>Profile</div></Link>
            <div onClick={handleLogout} className={styles.logout_btn}>Logout</div>
          </div>)
        )}
      </div>
    </div>
  )
}

export default Navbar;

