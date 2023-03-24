import React from 'react';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
// import { Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from "./pages/login";
import Signup from './pages/signup';
import Jobslist from './pages/jobsList';


function App() {
// const user = useSelector((state) => state.user);
// const dispatch = useDispatch();

  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route index element={<Home />}/>
        {
          // !user && (
            <>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />} />
            </>
          // )
        }
        {
          // user && (
            <>
              {/* <Route path="/cart" element={< />} />
              <Route path="/cart" element={< />} /> */}
              <Route path='/jobslist' element={<Jobslist />} />
            </>
          // )
        }
      </Routes>
    </div>
  );
}

export default App;
