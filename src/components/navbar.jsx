import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { API_PATH } from '../hooks/config';


function NavBar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const HandleLogout = () => {
    window.localStorage.clear();
    window.location.href="/login"
  };

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
        console.error('Error fetching user data', error);

      }
    };


    fetchUserData();
 }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/profile" className="nav-logo">
            <FaUser className="nav-logo" />
          </NavLink>
              {userLoggedIn ? (
            <NavLink
            className="nav-links"
            onClick={HandleLogout}
            >
              Logout
            </NavLink>
        ) : (
            <NavLink
              exact
              to="/login"
              className="nav-links"
              
            >
              Login
            </NavLink>
        )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
