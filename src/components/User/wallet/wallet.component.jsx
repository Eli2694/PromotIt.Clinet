import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../../../context/wallet';
import { AddMoneyToUser, getUserMoney } from '../../../services/Users.services';
import './wallet.css';

export const Wallet = () => {
  const { wallet, setWallet } = useContext(WalletContext);
  const navigate = useNavigate();
  const [UserMoney, setUserMoney] = useState();
  const { user } = useAuth0();
  console.log(wallet);

  const handleAddMoney = async (e) => {
    e.preventDefault();
    let Email = user.email;
    await AddMoneyToUser(UserMoney, Email);
    let userMoney = await getUserMoney(Email);
    await setWallet(userMoney);
  };

  return (
    <div className='productUpdate'>
      <h2>Current Ballance {parseFloat(wallet).toFixed(2)}$ </h2>
      <form onSubmit={handleAddMoney}>
        <label>Adding money to the previous amount in the wallet</label>
        <input
          type='Number'
          min={0}
          required
          onChange={(e) => setUserMoney(e.target.value)}
        />
        <button>Add</button>
        <button onClick={() => navigate('/')}>Go Back</button>
      </form>
      <img className='image' src='/images/wallet.jpg' alt='wallet' />
    </div>
  );
};
