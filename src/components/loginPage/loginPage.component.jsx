import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      type='submit'
      onClick={async () => {
        await loginWithRedirect('http://localhost:3000');
      }}
    >
      Go To Dashboard     
    </button>
  );
};
