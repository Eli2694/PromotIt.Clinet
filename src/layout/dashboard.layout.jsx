import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../context/role.context';
import { getRoles } from '../services/Auth0Roles.services';
import { checkIfUserExistsInDB } from '../services/Users.services';
import './dashboard.css';

export const Dashboard = () => {
  const { logout, user } = useAuth0();
  const { role, setRole } = useContext(RoleContext);

  const handleRole = async () => {
    try {
      let userId = user.sub;
      let roleFromAuth0 = await getRoles(userId);
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
      AssociationOwner: 0,
    };

    checkIfUserExistsInDB(logInUser);
  };

  useEffect(() => {
    handleRole();
  }, []);

  if (role.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    if (role.find((role) => role.name === 'Owner')) {
      return (
        <>
          <h1>Dashboard Owner</h1>
          <Link to='/' className='link'>
            Home
          </Link>
          <Link to='/association' className='link'>
            Register Association
          </Link>
          <Link to='/campaignRegistration' className='link'>
            Register Campaign
          </Link>
          <Link
            onClick={() => logout({ returnTo: window.location.origin })}
            to='/'
            className='link'
          >
            Logout
          </Link>
        </>
      );
    } else if (role.find((role) => role.name === 'BusinessRepresentative')) {
      return (
        <div className='dashboard'>
          <Link to='/' className='link'>
            Home
          </Link>
          <Link to='/AllCampaignsForBusiness' className='link'>
            List Of Campaigns
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
        <>
          <h1>Dashboard Social-Activist</h1>
          <Link to='/' className='link'>
            Home
          </Link>
          <Link
            onClick={() => logout({ returnTo: window.location.origin })}
            to='/'
            className='link'
          >
            Logout
          </Link>
        </>
      );
    } else {
      return (
        <>
          <h1>Dashboard User</h1>
          <Link to='/' className='link'>
            Home
          </Link>
          <Link
            onClick={() => logout({ returnTo: window.location.origin })}
            to='/'
            className='link'
          >
            Logout
          </Link>
        </>
      );
    }
  }
};
