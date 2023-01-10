import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../context/role.context';
import { WalletContext } from '../context/wallet';
import { getRoles } from '../services/Auth0Roles.services';
import {
  checkIfUserExistsInDB,
  getUserMoney,
  InitializeWallet,
} from '../services/Users.services';
import './dashboard.css';

export const Dashboard = () => {
  const { logout, user } = useAuth0();
  const { role, setRole } = useContext(RoleContext);
  const { setWallet } = useContext(WalletContext);

  const handleRole = async () => {
    try {
      let userId = user.sub;
      let Email = user.email;
      let roleFromAuth0 = await getRoles(userId);
      await InitializeWallet(Email);
      let userMoney = await getUserMoney(Email);
      await setWallet(userMoney);
      setRole(roleFromAuth0);
      InsertUserToDB();
    } catch (error) {
      console.error(error);
    }
  };

  const InsertUserToDB = () => {
    let logInUser = {
      FullName: user.name,
      Email: user.email,
    };
    checkIfUserExistsInDB(logInUser);
  };

  useEffect(() => {
    handleRole();
  }, []);

  if (role.find((role) => role.name === 'Owner')) {
    return (
      <div className='dashboard'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/wallet' className='link'>
          Wallet
        </Link>
        <Link
          onClick={() => logout({ returnTo: window.location.origin })}
          to='/'
          className='link'
        >
          Logout
        </Link>
      </div>
    );
  } else if (role.find((role) => role.name === 'BusinessRepresentative')) {
    return (
      <div className='dashboard'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/registerCompany' className='link'>
          Register Company
        </Link>
        <Link to='/wallet' className='link'>
          Wallet
        </Link>
        <Link to='/AllCampaignsForBusiness' className='link'>
          List Of Campaigns
        </Link>
        <Link to='/listOfOrders' className='link'>
          List Of Orders To Confirm
        </Link>
        <Link
          onClick={() => logout({ returnTo: window.location.origin })}
          to='/'
          className='link'
        >
          Logout
        </Link>
      </div>
    );
  } else if (role.find((role) => role.name === 'NonProfitRepresentative')) {
    return (
      <div className='dashboard'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/wallet' className='link'>
          Wallet
        </Link>
        <Link to='/association' className='link'>
          Register Association
        </Link>
        <Link to='/campaignRegistration' className='link'>
          Register Campaign
        </Link>
        <Link to='/personalCampaigns' className='link'>
          Personal Campaigns
        </Link>
        <Link
          onClick={() => logout({ returnTo: window.location.origin })}
          to='/'
          className='link'
        >
          Logout
        </Link>
      </div>
    );
  } else if (role.find((role) => role.name === 'SocialActivist')) {
    return (
      <div className='dashboard'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/wallet' className='link'>
          Wallet
        </Link>
        <Link to='/pointes' className='link'>
          Pointes
        </Link>
        <Link
          onClick={() => logout({ returnTo: window.location.origin })}
          to='/'
          className='link'
        >
          Logout
        </Link>
      </div>
    );
  } else {
    return (
      <div className='dashboard'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/wallet' className='link'>
          Wallet
        </Link>
        <Link
          onClick={() => logout({ returnTo: window.location.origin })}
          to='/'
          className='link'
        >
          Logout
        </Link>
      </div>
    );
  }
};
