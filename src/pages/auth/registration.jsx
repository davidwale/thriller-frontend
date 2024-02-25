import React, { useState } from 'react';
import axios from 'axios'
import { API_PATH } from '../../hooks/config';
import { RotatingLines } from 'react-loader-spinner'

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('')
   try {
          const response = await axios.post(`${API_PATH}/signup`,
          {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
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
      <h2>USER SIGNUP</h2>
      <form onSubmit={handleSubmit}>
          <div>
            {successMessage && (
                      <p>{successMessage}</p>
                  )}
                  {errorMessage && (
                      <p>{errorMessage}</p>
                  )}
            <div className='input-container'>
              <p>username</p>
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
            <p>Email Address</p>
          <input
            type="email"
            id="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
          <div className='input-container'>
            <p>password</p>
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
            Already A User? <a href="/login">Login</a>
          </p>
        <button type="submit" disabled={loading}>
         {loading ? (
                <RotatingLines strokeColor="grey" height={10} width={30} />
              ) : (
                'REGISTER'
              )} 
        </button>
      </form>
    </div>
    </div>
   
  );
};

export default RegistrationPage;
