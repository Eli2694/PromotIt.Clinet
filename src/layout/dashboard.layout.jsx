import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { getRoles } from '../services/Auth0Roles.services';

export const Dashboard = () => {
  const { logout, user } = useAuth0();
  const [role, setRole] = useState([]);

  const handleRole = async () => {
    try {
      let userId = user.sub;
      let roleFromAuth0 = await getRoles(userId);
      setRole(roleFromAuth0);
      console.log(roleFromAuth0);
    } catch (error) {
      console.error(error);
    }
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
          <button onClick={logout}>Logout</button>
        </>
      );
    } else if (role.find((role) => role.name === 'BusinessCompany')) {
      return (
        <>
          <h1>Dashboard BusinessCompany</h1>
          <button onClick={logout}>Logout</button>
        </>
      );
    } else if (role.find((role) => role.name === 'NonProfit')) {
      return (
        <>
          <h1>Dashboard Non-profit</h1>
          <button onClick={logout}>Logout</button>
        </>
      );
    } else if (role.find((role) => role.name === 'SocialActivist')) {
      return (
        <>
          <h1>Dashboard Social-Activist</h1>
          <button onClick={logout}>Logout</button>
        </>
      );
    } else {
      return (
        <>
          <h1>Dashboard User</h1>
          <button onClick={logout}>Logout</button>
        </>
      );
    }
  }
};
