import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import RegistrationPage from './pages/auth/registration';
import LoginPage from './pages/auth/login';
import ProfilePage from './pages/user-profile';
import TransferPoints from './pages/TransferPoint';
import axios from 'axios'
import { API_PATH } from './hooks/config';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);


useEffect(() => {

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_PATH}/user`,
        {
        headers: {
          Authorization: `${token}`,
        },
        });
        if (response) {
        setUserLoggedIn(true);
      }
        
      } catch (error) {
        setUserLoggedIn(false);
      }
    };


    fetchUserData();
  }, []);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/get-started' element={<RegistrationPage />} />
          {userLoggedIn ? (
            <Route path='/' element={<ProfilePage />} />
          ): (
            <Route path='/' element={<LoginPage />} />
          )}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/transaction' element={<TransferPoints />} />
        </Routes>
     </Router>
    </div>
  );
}

export default App;
