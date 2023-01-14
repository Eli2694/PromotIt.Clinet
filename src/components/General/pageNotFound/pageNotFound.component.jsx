import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './pageNotFound.css';

export const PageNotFound = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate('/');
  };

  return (
    <div className='not-found'>
      <h2>Page Not Found</h2>
      <Button variant='secondary' onClick={GoBack}>
        Go Back
      </Button>
    </div>
  );
};
