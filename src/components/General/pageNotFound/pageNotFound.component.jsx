import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate('/');
  };

  return (
    <>
      <div>Page Not Found</div>
      <button onClick={GoBack}>Go Back</button>
    </>
  );
};
