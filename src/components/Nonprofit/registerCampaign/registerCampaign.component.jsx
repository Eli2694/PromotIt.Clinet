import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useState } from 'react';
import { RoleContext } from '../../../context/role.context';
import { RegisCampaign } from '../../../services/Campaigns.services';
import './registerCampaign.style.css';

export const RegisterCampaign = () => {
  const [campaignName, setCampaignName] = useState();
  const [campaignWebsite, setCampaignWebsite] = useState();
  const [campaginHashtag, setCampaignHashtag] = useState();
  const [donationAmount, setDonationAmount] = useState('0.00');
  const { user } = useAuth0();
  const [Email] = useState(user.email);
  const { role } = useContext(RoleContext);
  const [websiteError, setWebsiteError] = useState('');

  const handleWebsiteChange = (e) => {
    const website = e.target.value;
    if (!website.startsWith('https://')) {
      setWebsiteError("Please include 'https://' in the website address");
    } else {
      setWebsiteError('');
      setCampaignWebsite(website.replace(/'/g, ''));
    }
  };

  //Register campaign
  const handleSubmitCampagin = (e) => {
    e.preventDefault();
    const campaign = {
      campaignName,
      campaignWebsite,
      campaginHashtag,
      Email,
      donationAmount,
    };
    RegisCampaign(campaign);
  };

  //Form for submitting campaign information for Nonprofit user
  if (role.find((role) => role.name === 'NonProfitRepresentative')) {
    return (
      <div className='register'>
        <h2>What Campaign Are You Creating?</h2>
        <h4>
          Before Creating A Campaign You Have To Register Your Association!!!
        </h4>
        <form onSubmit={handleSubmitCampagin}>
          <label>Campaign Name</label>
          <input
            type='text'
            required
            onChange={(e) => setCampaignName(e.target.value.replace(/'/g, ''))}
          />
          <label>Campaign Hashtag : without #</label>
          <input
            type='text'
            required
            onChange={(e) =>
              setCampaignHashtag(e.target.value.replace(/'/g, ''))
            }
          />
          <label>Campaign Website : require https://</label>
          <input
            type='text'
            required
            onChange={handleWebsiteChange}
            placeholder={websiteError ? websiteError : 'https://'}
          />

          <button>Add Campaign</button>
        </form>
      </div>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
