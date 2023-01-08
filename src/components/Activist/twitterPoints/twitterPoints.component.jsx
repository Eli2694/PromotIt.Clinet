import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TwitterWalletContext } from '../../../context/twitterWallet';
import { getUserTweets, getUserTwitterID } from '../../../services/Activist';
import './twitterPoints.css';

export const TwitterPoints = () => {
  const { points, setPoints } = useContext(TwitterWalletContext);
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');
  const [tweets, setTweets] = useState([]);

  // const GetInfoAboutCampaigns = async () => {

  // };

  // useEffect(() => {

  // }, []);

  const finalizeUsernameChange = async (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    console.log(username);
    let userObj = await getUserTwitterID(username);
    console.log(userObj.data[0]);
    setUserInfo(userObj.data[0]);
    if (userObj.data[0]) {
      getUserTimelineForTweets();
    }
  };

  const getUserTimelineForTweets = () => {
    let now = new Date();
    let year = now.getFullYear(); // current year (4 digits)
    let month = now.getMonth() + 1; // current month (0-11)
    month = month.toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0'); // current day of the month (1-31)
    let hours = now.getHours() - 2;
    hours = hours().toString().padStart(2, '0'); // current hour (0-23)
    let minutes = now.getMinutes().toString().padStart(2, '0'); // current minute (0-59)
    let seconds = now.getSeconds().toString().padStart(2, '0'); // current second (0-59)

    let since = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    let until = `${year}-${month}-${day}T${(
      parseInt(hours) + 1
    ).toString()}:${minutes}:${seconds}Z`;
    setSince(since);
    setUntil(until);
  };

  const handleTweets = async () => {
    let tweets = await getUserTweets(userInfo.username, since);
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
          tweeting, click get points!
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
