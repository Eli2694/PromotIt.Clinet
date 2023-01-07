import React, { useEffect, useState } from 'react';
import {
  getCampaignHashtag,
  getCampaignWebsites,
} from '../../../services/Activist';

export const TwitterPoints = () => {
  const [campaignsWeb, setCampaignsWeb] = useState([]);
  const [campaignsHash, setCampaignsHash] = useState([]);
  const [username, setUsername] = useState('');

  const GetInfoAboutCampaigns = async () => {
    let websites = await getCampaignWebsites();
    console.log(websites);
    setCampaignsWeb(websites);
    let hashtags = await getCampaignHashtag();
    console.log(hashtags);
    setCampaignsHash(hashtags);
  };

  useEffect(() => {
    GetInfoAboutCampaigns();
  }, []);

  const finalizeUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  return (
    <div>
      <input
        type='text'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={finalizeUsernameChange}>Save</button>
    </div>
  );
};
