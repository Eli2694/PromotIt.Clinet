import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { getRoles } from '../services/Auth0Roles';

export const Dashboard = () => {
  const { logout, user } = useAuth0();
  const [role, setRole] = useState([]);

  const handleRole = async () => {
    try {
      let userId = user.sub;
      let roleFromAuth0 = await getRoles(userId);
      setRole(roleFromAuth0);
      console.log(role.name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRole();
  }, []);

  if (!role) {
    return <h1>Loading...</h1>;
  }

  if (role.name === 'Owner') {
    return (
      <>
        <h1>Owner</h1>
        <button onClick={logout}>Logout</button>
      </>
    );
  } else if (role.name === 'BusinessCompany') {
    return (
      <>
        <h1>BusinessCompany</h1>
        <button onClick={logout}>Logout</button>
      </>
    );
  } else if (role.name === 'Non-profit') {
    return (
      <>
        <h1>Non-profit</h1>
        <button onClick={logout}>Logout</button>
      </>
    );
  } else if (role.name === 'Social-Activist') {
    return (
      <>
        <h1>Social-Activist</h1>
        <button onClick={logout}>Logout</button>
      </>
    );
  } else {
    return (
      <>
        <h1>User</h1>
        <button onClick={logout}>Logout</button>
      </>
    );
  }
};
