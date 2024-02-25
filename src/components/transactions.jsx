import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { API_PATH } from '../hooks/config'; 

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {

      try {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        const response = await axios.get(`${API_PATH}/transactions/${username}`,
        {
        headers: {
          Authorization: `${token}`,
        },
      });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div className='transaction'>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Beneficiary</th>
            <th>Charges</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleString('en-US',
                { hour: 'numeric', minute: 'numeric', hour12: true })}
              </td>

              <td>{new Date(transaction.date).toLocaleString(
                    'en-uk',
                     {month: 'numeric', day: 'numeric', year: 'numeric' },
                    )}</td>
              <td>{transaction.points}</td>
              <td>{transaction.counterparty}</td>
              <td>{transaction.charges}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistoryPage;
