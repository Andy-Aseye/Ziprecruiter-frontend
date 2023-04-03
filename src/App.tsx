import React from "react";
import "./App.css";
import { Routes, Route, useRoutes, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import ApplicantSignup from "./pages/applicantPages/applicantSignup";
import Jobslist from "./pages/applicantPages/jobsList";
import Addjob from "./pages/recruiter/addJobs";
import Myjobs from "./pages/recruiter/myJobs";
import { useAppSelector } from "./store";
import Viewjob from "./pages/viewJob";
import Myapplications from "./pages/applicantPages/appliedJobs";
import RecruiterSignup from "./pages/recruiter/recruiterSignup";
import JobApplications from "./pages/recruiter/JobApplications";
import Recruiterapplications from "./pages/recruiter/myApplications";
import UpdateJob from "./pages/recruiter/updateJob";


const App = () => {
  const user = useAppSelector((state) => state.auth.user);

  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
      caseSensitive: false,
    },
    {
      path: "/login",
      element: !user ? <Login /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/recruiter-signup",
      element: !user ? <RecruiterSignup /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/applicant-signup",
      element: !user ? <ApplicantSignup /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/jobslist",
      element: user && user.type === "applicant" ? <Jobslist /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/myapplications",
      element: user && user.type === "applicant" ? <Myapplications /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/api/jobs/:id/update-job",
      element: user && user.type === "recruiter" ? <UpdateJob /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/jobslist/api/jobs/:id",
      element: user && user.type === "applicant" ? <Viewjob /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/addjob",
      element: user && user.type === "recruiter" ? <Addjob /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "jobslist/api/jobs/:id/applications",
      element: user && user.type === "recruiter" ? <JobApplications /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/myjobs",
      element: user && user.type === "recruiter" ? <Myjobs /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
    {
      path: "/api/jobs/:id/applications",
      element: user && user.type === "recruiter" ? <Recruiterapplications /> : <Navigate to="/" replace />,
      caseSensitive: false,
    },
  ]);

  return (
    <div>
      <Navbar />
      {routes}
    </div>
  );
};

export default App;



// <Routes>
//         <Route index element={<Home />} />
//         {/* {!user && ( */}
//         <>
//           <Route path="/login" element={<Login />} />
//           <Route path="/recruiter-signup" element={<RecruiterSignup />} />
//           <Route path="/applicant-signup" element={<ApplicantSignup />} />
//         </>
//         {/* )} */}
//         {/* {user && user.type === "user" && ( */}
//         <>
//           <Route path="/jobslist" element={<Jobslist />} />
//           <Route path="/myapplications" element={<Myapplications />} />
//           <Route path="/api/jobs/:id/update-job" element={<UpdateJob />} />
//           <Route path="/jobslist/api/jobs/:id" element={<Viewjob />} />
//         </>
//         {/* )} */}
//         {/* {user && user.type === "recruiter" && ( */}
//         <>
//           <Route path="/addjob" element={<Addjob />} />
//           <Route
//             path="jobslist/api/jobs/:id/applications"
//             element={<JobApplications />}
//           />
//           <Route path="/myjobs" element={<Myjobs />} />
//           <Route
//             path="/api/jobs/:id/applications"
//             element={<Recruiterapplications />}
//           />
//         </>
//         {/* )} */}
//         {/* <Route path="*" element={<Home />}/> */}
//       </Routes>