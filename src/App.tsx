import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import ApplicantSignup from "./pages/applicantPages/applicantSignup";
import Jobslist from "./pages/applicantPages/jobsList";
import Addjob from "./pages/recruiter/addJobs";
import Myjobs from "./pages/recruiter/myJobs";
import { useAppSelector } from "./store";
import Viewjob from "./pages/applicantPages/viewJob/index";
import Myapplications from "./pages/applicantPages/appliedJobs";
import RecruiterSignup from "./pages/recruiter/recruiterSignup";

const App = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        {/* {!user && ( */}
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/recruiter-signup" element={<RecruiterSignup />} />
          <Route path="/applicant-signup" element={<ApplicantSignup />} />
        </>
        {/* )} */}
        {/* {user && user.type === "user" && ( */}
        <>
          <Route path="/jobslist" element={<Jobslist />} />
          <Route path="/myapplications" element={<Myapplications />} />
          <Route path="/job/:id" element={<Viewjob />} />
        </>
        {/* )} */}
        {/* {user && user.type === "recruiter" && ( */}
        <>
          <Route path="/addjob" element={<Addjob />} />
          <Route path="/myjobs" element={<Myjobs />} />
        </>
        {/* )} */}
        {/* <Route path="*" element={<Home />}/> */}
      </Routes>
    </div>
  );
};

export default App;

// import './App.css';
// import {Routes, Route} from "react-router-dom";
// import Navbar from './components/Navbar';
// import Home from './pages/home';
// import Login from "./pages/login";
// import Signup from './pages/signup';
// import Jobslist from './pages/jobsList';
// import Addjob from './pages/recruiter/addJobs';
// import Myjobs from './pages/recruiter/myJobs';
// import { useAppSelector } from './store';
// import Viewjob from "./pages/viewJob/index";
// import Myapplications from './pages/appliedJobs';

// function App() {
//   // @ts-ignore
// // const user = useSelector((state) => state.user);
// const token = useAppSelector(state => state.auth.user?.token);
// // const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <Navbar />
//       <Routes>
//         <Route index element={<Home />}/>
//         {/* render login and signup if user is null */}
//         {
//           token == null ? (
//             <>
//             <Route path="/login" element={<Login />}/>
//             <Route path="/signup" element={<Signup />} />
//             </>
//           ): null
//         }
//         {
//           token != null ? (
//             <>
//               <Route path="/cart" element={<></>} />
//               <Route path='/jobslist' element={<Jobslist />} />
//               <Route path="/addjob" element={<Addjob />}/>
//               <Route path="/myjobs" element={<Myjobs />}/>
//               <Route path="/job/:id" element={<Viewjob />}/>
//               <Route path='/myapplications' element={<Myapplications/>}/>
//             </>
//           ): null
//         }
//       </Routes>
//     </div>
//   );
// }

// export default App;
