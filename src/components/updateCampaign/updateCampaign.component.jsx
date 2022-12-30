import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdaCampaign } from '../../services/Campaigns.services';

export const UpdateCampaign = () => {
  const [campaignName, setCampaignName] = useState();
  const [campaignWebsite, setCampaignWebsite] = useState();
  const [campaginHashtag, setCampaignHashtag] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const { CampaignId } = location.state ? location.state : { CampaignId: null };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let cUpdate = {
      campaignName,
      campaignWebsite,
      campaginHashtag,
      CampaignId,
    };
    await UpdaCampaign(cUpdate);
    navigate('/personalCampaigns');
  };
  return (
    <div className='create'>
      <h2>Update Campaign</h2>
      <form onSubmit={handleUpdate}>
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
        <button>Update</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </form>
    </div>
  );
};
