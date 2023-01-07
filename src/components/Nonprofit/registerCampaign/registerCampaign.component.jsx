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
  const [FullName] = useState(user.name);
  const [Email] = useState(user.email);
  const { role } = useContext(RoleContext);

  const handleSubmitCampagin = (e) => {
    e.preventDefault();

    const campaign = {
      campaignName,
      campaignWebsite,
      campaginHashtag,
      FullName,
      Email,
      donationAmount,
    };
    RegisCampaign(campaign);
  };

  if (role.find((role) => role.name === 'NonProfitRepresentative')) {
    return (
      <div className='register'>
        <h2>What Campaign Are You Creating?</h2>
        <form onSubmit={handleSubmitCampagin}>
          <label>Campaign Name</label>
          <input
            type='text'
            required
            onChange={(e) => setCampaignName(e.target.value.replace(/'/g, ''))}
          />
          <label>Campaign Hashtag</label>
          <input
            type='text'
            required
            onChange={(e) =>
              setCampaignHashtag(e.target.value.replace(/'/g, ''))
            }
          />
          <label>Campaign Website</label>
          <input
            type='text'
            required
            onChange={(e) =>
              setCampaignWebsite(e.target.value.replace(/'/g, ''))
            }
          />

          <button>Add Campaign</button>
        </form>
      </div>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
