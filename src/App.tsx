import React from 'react';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from "./pages/login";
import Signup from './pages/signup';
import Jobslist from './pages/jobsList';
import Addjob from './pages/recruiter/addJobs';


function App() {
  // @ts-ignore
const user = useSelector((state) => state.user);
// const dispatch = useDispatch();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />}/>
        {
          !user.token && !user.email && !user.type && (
            <>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />} />
            </>
          )
        }
        {
          user && (
            <>
              <Route path="/cart" element={<></>} />
              <Route path='/jobslist' element={<Jobslist />} />
              <Route path="/addjob" element={<Addjob />}/>
            </>
          )
        }
      </Routes>
    </div>
  );
}

export default App;
