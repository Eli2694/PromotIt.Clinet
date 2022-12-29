import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const UpdateCampaign = () => {
  const [campaignName, setCampaignName] = useState();
  const [campaignWebsite, setCampaignWebsite] = useState();
  const [campaginHashtag, setCampaignHashtag] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const { CampaignID } = location.state;

  const handleUpdate = async () => {
    let cUpdate = {
      campaignName,
      campaignWebsite,
      campaginHashtag,
      CampaignID,
    };
    await UpdaCampaign(updateCampaign);
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
      </form>
    </div>
  );
};
