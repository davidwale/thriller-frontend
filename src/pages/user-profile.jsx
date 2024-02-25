import React, { useEffect, useState } from 'react';
import TransactionHistoryPage from '../components/transactions';
import axios from 'axios'
import { API_PATH } from '../hooks/config';
import NavBar from '../components/navbar';
import { Oval } from 'react-loader-spinner'


const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_PATH}/user`,
        {
        headers: {
          Authorization: `${token}`,
        },
      });
        setUsername(response.data.username);
        setBalance(response.data.balance);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        if (error.response &&
            error.response.data.message.includes('Unauthorized')) {
            setErrorMessage("Kindly Login to View Profile")
          } else if (error.response) {
            setErrorMessage(error.response.data.message)
          } else {
            setErrorMessage("An Unexpected Error Occured!!! Pls Try Again Later")
          }
      }
    };


    fetchUserData();
  }, []);

  return (
    <div>
      {isLoading && (
        <Oval
          height={80}
          width={80}
          color="#0D6EFD"
          wrapperStyle={{
            opacity: '0.7',
            zIndex: '999999',
            width: '100%',
            height: '100vh',
            backgroundColor: 'black',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
          wrapperClass="oval-loader"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#0D6EFD"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      <NavBar />
      <div className='profile-container'>
       {errorMessage ? (
        <div>{errorMessage}</div> 
      ) : (
        <>
          <div>
                <h1>Hello {username}</h1>
                <br />
                <h3>Balance</h3>
                <br />
            <p>Current Balance: {balance} credits</p>
            <br />
              </div>
              <br />
          <div>
            <a href='/transaction'>
                  <button className='send-btn'>Transfer Points</button>
                  <br />
            </a>
          </div>
          <div>
            <TransactionHistoryPage />
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default ProfilePage;
