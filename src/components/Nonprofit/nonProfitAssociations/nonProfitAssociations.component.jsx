import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { RegisterAssociation } from '../../../services/Associations.services';
import './nonProfitAssociations.css';

export const NonProfitAssociations = () => {
  const [AssociationName, setAssociationName] = useState();
  const [AssociationEmail, setAssociationEmail] = useState();
  const [AssociationWebsite, setAssociationWebsite] = useState();
  const [RegisteredAssociation] = useState('true');
  const { user } = useAuth0();
  const [FullName] = useState(user.name);
  const [Email] = useState(user.email);
  const [websiteError, setWebsiteError] = useState('');

  const handleWebsiteChange = (e) => {
    const website = e.target.value;
    if (!website.startsWith('https://')) {
      setWebsiteError("Please include 'https://' in the website address");
    } else {
      setWebsiteError('');
      setAssociationWebsite(website.replace(/'/g, ''));
    }
  };

  //Register Nonprofit user Association
  const handleSubmit = (e) => {
    e.preventDefault();
    const association = {
      AssociationName,
      AssociationEmail,
      AssociationWebsite,
      RegisteredAssociation,
      FullName,
      Email,
    };
    RegisterAssociation(association);
  };
  return (
    <div className='create'>
      <h2>What Association Are You From?</h2>
      <form onSubmit={handleSubmit}>
        <label>Association Name</label>
        <input
          type='text'
          required
          onChange={(e) => setAssociationName(e.target.value.replace(/'/g, ''))}
        />
        <label>Association Email</label>
        <input
          type='email'
          required
          onChange={(e) => setAssociationEmail(e.target.value)}
        />
        <label>Association Website : require https://</label>
        <input
          type='text'
          required
          onChange={handleWebsiteChange}
          placeholder={websiteError ? websiteError : 'https://'}
        />
        <button>Add Association</button>
      </form>
    </div>
  );
};
