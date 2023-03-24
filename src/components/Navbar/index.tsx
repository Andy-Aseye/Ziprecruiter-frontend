import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index





// import React from 'react';
// import styles from "./styles.module.css";
// import Logo from "../../assets/ziprecuiter.png";
// import { useSelector, } from 'react-redux';
// import {Link} from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className={styles.nav_container}>
//       <div className={styles.nav_logo}>
//         <img src={Logo} alt='' className={styles.logo_img}/>
//       </div>
//       <div className={styles.nav_links}>
//         {auth.type ? (
//           user.type === "recruiter" ? (
//             <>
//             <Link to="/home"><div>Home</div></Link>
//             <Link to="/addjob"><div>Post a Job</div></Link>
//             <Link to="/myjobs"><div>My Jobs</div></Link>
//             <Link to="/profile"><div>Profile</div></Link>
//             <Link to="/logout"><div>Logout</div></Link>
//             </>
//           ) : (
//             <>
//             <Link to=""><div>Home</div></Link>
//             <Link to=""><div>My Applications</div></Link>
//             <Link to=""><div>Profile</div></Link>
//             <Link to=""><div>Logout</div></Link>
//             </>
//           ) : (
//             <>
//             <Link to=""><div>About</div></Link>
//             <Link to=""><div>Sign In</div></Link>
//             </>
//           )
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar;