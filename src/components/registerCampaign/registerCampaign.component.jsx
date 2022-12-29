import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import './registerCampaign.css';

export const RegisterCampaign = () => {
  const [campaignName, setCampaignName] = useState();
  const [campaignWebsite, setCampaignWebsite] = useState();
  const [campaginHashtag, setCampaignHashtag] = useState();
  const { user } = useAuth0();
  const [FullName] = useState(user.name);
  const [Email] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const campaign = {
      campaignName,
      campaignWebsite,
      campaginHashtag,
      FullName,
      Email,
    };
    RegisterCampaign(campaign);
  };
  return (
    <div className='create'>
      <h2>What Campaign Are You Creating?</h2>
      <form onSubmit={handleSubmit}>
        <label>Campaign Name</label>
        <input
          type='text'
          required
          onChange={(e) => setCampaignName(e.target.value)}
        />
        <label>Campaign Hashtag</label>
        <input
          type='text'
          required
          onChange={(e) => setCampaignHashtag(e.target.value)}
        />
        <label>Campaign Website</label>
        <input
          type='text'
          required
          onChange={(e) => setCampaignWebsite(e.target.value)}
        />
        <button>Add Campaign</button>
      </form>
    </div>
  );
};
