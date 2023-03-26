import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from "./pages/login";
import Signup from './pages/signup';
import Jobslist from './pages/jobsList';
import Addjob from './pages/recruiter/addJobs';
import Myjobs from './pages/recruiter/myJobs';
import { useAppSelector } from './store';


function App() {
  // @ts-ignore
// const user = useSelector((state) => state.user);
const token = useAppSelector(state => state.auth.user?.token);
// const dispatch = useDispatch();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />}/>
        {/* render login and signup if user is null */}
        {
          token == null ? (
            <>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />} />
            </>
          ): null
        }
        {
          token != null ? (
            <>
              <Route path="/cart" element={<></>} />
              <Route path='/jobslist' element={<Jobslist />} />
              <Route path="/addjob" element={<Addjob />}/>
              <Route path="/myjobs" element={<Myjobs />}/>
            </>
          ): null
        }
      </Routes>
    </div>
  );
}

export default App;
