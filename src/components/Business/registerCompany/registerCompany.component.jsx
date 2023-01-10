import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { RegisCompany } from '../../../services/Business.services';
import './registerCompany.css';

export const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState();
  const [companyWebsite, setCompanyWebsite] = useState();
  const [RegisteredCompany] = useState('true');
  const { user } = useAuth0();
  const [Email] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = {
      companyName,
      companyWebsite,
      RegisteredCompany,
      Email,
    };
    RegisCompany(company);
  };
  return (
    <div className='create'>
      <h2>What Business Company Are You Representing?</h2>
      <form onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input
          type='text'
          required
          onChange={(e) => setCompanyName(e.target.value.replace(/'/g, ''))}
        />
        <label>Company Website: required https://</label>
        <input
          type='text'
          required
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
        <button>Add Business Company</button>
      </form>
    </div>
  );
};
