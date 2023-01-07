import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TwitterWalletContext } from '../../../context/twitterWallet';
import {
  getCampaignHashtag,
  getCampaignWebsites,
  getUserTimelineForTweets,
  getUserTweetsLastHour,
  getUserTwitterID,
} from '../../../services/Activist';
import './twitterPoints.css';

export const TwitterPoints = () => {
  const { points, setPoints } = useContext(TwitterWalletContext);
  const [campaignsWeb, setCampaignsWeb] = useState([]);
  const [campaignsHash, setCampaignsHash] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserID] = useState('');
  const [timeLine, setTimeLine] = useState({});
  const [tweets, setTweets] = useState([]);

  const GetInfoAboutCampaigns = async () => {
    let websites = await getCampaignWebsites();
    setCampaignsWeb(websites);
    let hashtags = await getCampaignHashtag();
    setCampaignsHash(hashtags);
  };

  useEffect(() => {
    GetInfoAboutCampaigns();
  }, []);

  const finalizeUsernameChange = async (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    console.log(username);
    let id = await getUserTwitterID(username);
    setUserID(id);
    let time = await getUserTimelineForTweets();
    setTimeLine(time);
    console.log(time);
  };

  const handleTweets = async () => {
    let tweets = await getUserTweetsLastHour(userId, timeLine);
    console.log(tweets);
    setTweets(tweets);
  };

  return (
    <div className='productUpdate'>
      <h2>Twitter Points {parseFloat(points).toFixed(2)}$ </h2>
      <form onSubmit={finalizeUsernameChange}>
        <label>
          Add a Twitter username and start marketing a campaign for no more than
          an hour. Each tweet should include the name of the campaign and the
          hashtag of the campaign according to the home page. When you're done
          tweeting, click get points
        </label>
        <input
          type='text'
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Add</button>
      </form>
      <button onClick={handleTweets}>Get Points</button>
    </div>
  );
};
