import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_PATH } from '../hooks/config';
import { RotatingLines, Oval } from 'react-loader-spinner'
import NavBar from '../components/navbar';



const TransferPoints = () => {
  const [username, setUsername] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [charges, setCharges] = useState(0);
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

 useEffect(() => {

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_PATH}/user`,
        {
        headers: {
          Authorization: `${token}`,
        },
      });
        setUsername(response.data.username);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching user data', error);

      }
    };


    fetchUserData();
 }, []);
  
  const calculateCharges = (amount) => {
    return Math.floor(amount / 100);
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('')
      setLoading(true);
      try {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_PATH}/sendpoints`,
    {
      senderUsername: username.toLowerCase(),
      recipientUsername: recipient.toLowerCase(),
      points: amount,
    },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
        setSuccessMessage(response.data.message);
        setLoading(false);
} catch (error) {
        setLoading(false);
          setSuccessMessage('')
          if (error.response.data &&
            error.response.data.message.includes('Unauthorized')) {
            setErrorMessage("Kindly Login to Transfer points")
          } else if (error.response) {
            setErrorMessage(error.response.data.message)
          } else {
            setErrorMessage("An Unexpected Error Occured!!! Pls Try Again Later")
          }
          
      }
  };

  useEffect(() => {
    const newCharges = calculateCharges(amount);
    setCharges(newCharges);
  }, [amount]);

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
      <div className='login-page'>
      
 <div className='login-container'>
        <h2>Transfer Points</h2>
        <form onSubmit={handleSubmit}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {successMessage && (
                      <p className='message'>{successMessage}</p>
                  )}
                  {errorMessage && (
                      <p className='message'>{errorMessage}</p>
          )}
          <div className='input-container'>
            <p>Recipient's Username</p>
        <input
            type='text'
            placeholder="Enter Recipient's Username"
          value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
            </div>
          <div className='input-container'>
            <p>Amount</p>
        <input  
            type='number'
            placeholder="Enter Amount"
          min={1}
          value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p>Charges incurred: {charges}</p>
            </div>
      </div>
          <button type='submit' disabled={loading}>
           {loading ? (
                <RotatingLines strokeColor="grey" height={10} width={30} />
              ) : (
                'TRANSFER'
              )} 
          </button>
        </form>
        </div>
    </div>
    </div>
  );
};

export default TransferPoints;
