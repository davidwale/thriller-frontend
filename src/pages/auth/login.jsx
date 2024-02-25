import React, { useState } from 'react';
import axios from 'axios'
import './style.css'
import { API_PATH } from '../../hooks/config';
import { RotatingLines } from 'react-loader-spinner'


const LoginPage = () => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('')
      setLoading(true);
      try {
          const response = await axios.post(`${API_PATH}/login`,
          {
          username: username.toLowerCase(),
          password: password,
              });
          setSuccessMessage(response.data.message)
          const { token } = response.data
          const userName = response.data.username
          
      window.localStorage.setItem('username', userName)
      window.localStorage.setItem('LoggedIn', true)
          window.localStorage.setItem('token', token)
          window.location.href = '/profile';
      } catch (error) {
        setLoading(false);
          setSuccessMessage('')
          console.error('Error with Login', error);
          if (error.response) {
              setErrorMessage(error.response.data.message)
          } else {
              setErrorMessage("An Unexpected Error Occured")
          }
      }
  };

  return (
    <div className='login-page'>
          <div className='login-container'>
              <h1>USER LOGIN</h1>
      <form onSubmit={handleSubmit}>
              <div>
                  {successMessage && (
                      <p>{successMessage}</p>
                  )}
                  {errorMessage && (
                      <p>{errorMessage}</p>
                      )}
                <div className='input-container'>
                <p>username*</p>
          <input
            type="text"
                  id="username"
                  placeholder='username'          
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </div>
        </div>
          <div className='input-container'>
             <p>Password*</p>
          <input
            type="password"
            id="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            </div>
            <p className='auth-link'>
            Create New Account? <a href="/get-started">Sign Up</a>
          </p>
          <button type="submit" disabled={loading}>
            {loading ? (
                <RotatingLines strokeColor="#35374B" height={10} width={30} />
              ) : (
                'LOGIN'
              )}
          </button>
      </form>
        </div>
    </div>
  );
};

export default LoginPage;
