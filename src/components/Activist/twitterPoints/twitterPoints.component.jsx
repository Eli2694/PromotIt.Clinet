import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { TwitterWalletContext } from '../../../context/twitterWallet';
import {
  ActivistPromoteCampaign,
  getActivistPoints,
  getUserTweets,
  getUserTwitterID,
  InitiateActivistPoints,
  updateTweetsAmountPerCampaign,
  updateUserPoints,
} from '../../../services/Activist.services';
import { getFullListOfCampaigns } from '../../../services/Users.services';
import './twitterPoints.css';

export const TwitterPoints = () => {
  const { points, setPoints } = useContext(TwitterWalletContext);
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [since, setSince] = useState('');
  const [campaignId, setCampaignId] = useState();
  const [hashtag, setHashtag] = useState();
  const [website, setWebsite] = useState();
  const [campaigns, setCampaigns] = useState([]);
  //const [countTweets, setCountTweets] = useState();
  const [buttonPress, setButtonPress] = useState(true);
  const { user } = useAuth0();

  const handleCampaignState = async (
    CampaignId,
    campaginHashtag,
    campaignWebsite
  ) => {
    const urlObject = new URL(campaignWebsite);
    const cWebsite = urlObject.hostname;
    setCampaignId(CampaignId);
    setHashtag(campaginHashtag);
    setWebsite(cWebsite);

    let Email = user.email;
    await ActivistPromoteCampaign(CampaignId, Email);
  };

  const FullInfoAboutCampaigns = async () => {
    let Campaigns = await getFullListOfCampaigns();
    let Email = user.email;
    await InitiateActivistPoints(Email);
    let points = await getActivistPoints(Email);
    setPoints(points);
    setCampaigns(Campaigns);
  };

  useEffect(() => {
    FullInfoAboutCampaigns();
  }, []);

  const finalizeUsernameChange = async (e) => {
    if (!campaignId || !hashtag || !website) {
      alert('Please select a campaign to promote');
      return;
    }
    console.log(campaignId, hashtag, website);
    e.preventDefault();
    setUsername(e.target.value);
    setButtonPress(false);

    //update time to this moment
    getUserTimelineForTweets();

    let userObj = await getUserTwitterID(username);
    setUserInfo(userObj.data[0]);
  };

  const handleTweets = async () => {
    let tweets = await getUserTweets(
      since,
      userInfo.username,
      hashtag,
      website
    );
    console.log(tweets.meta.result_count);
    let PointsFromTweets = tweets.meta.result_count * 4;
    let resultCount = points + PointsFromTweets;
    let Email = user.email;
    await updateUserPoints(Email, PointsFromTweets);
    await updateTweetsAmountPerCampaign(
      tweets.meta.result_count,
      Email,
      campaignId
    );
    //setCountTweets(tweets.meta.result_count);
    setPoints(resultCount);
    //setButtonPress(true);

    getUserTimelineForTweets();
  };

  const getUserTimelineForTweets = () => {
    let now = new Date();
    let year = now.getFullYear(); // current year (4 digits)
    let month = now.getMonth() + 1; // current month (0-11)
    month = month.toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0'); // current day of the month (1-31)
    let hours = now.getHours() - 2;
    hours = hours.toString().padStart(2, '0'); // current hour (0-23)
    let minutes = now.getMinutes().toString().padStart(2, '0'); // current minute (0-59)
    let seconds = now.getSeconds().toString().padStart(2, '0'); // current second (0-59)

    let since = `${year}-${month}-${day}T${hours}:${minutes}`;
    setSince(since);
  };

  return (
    <body>
      <header>
        <div className='Twitter'>
          <h2 className='title'>Twitter Points: {points}</h2>
          <h5>To promote a campaign on Twitter:</h5>
          <p>
            1.From the list provided, choose the campaign you wish to promote by
            pressing the "Promote" button.
          </p>
          <p>2.Write your Twitter username and Press the "Add" button</p>
          <p>
            3.In each tweet for the campaign, include the provided hashtag and
            website. A maximum of 100 tweets are allowed per campaign.
          </p>
          <p>
            4.When you have finished promoting on Twitter, click "Get Points!"
          </p>
          <p>
            5.To launch a new campaign, please refresh the website and start the
            process from the beginning, following the provided instructions.
          </p>
          <form onSubmit={finalizeUsernameChange}>
            <label></label>
            <input
              type='text'
              placeholder='Twitter username without @'
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <button>Add</button>
          </form>
          <button onClick={handleTweets}>Get Points</button>
        </div>
      </header>
      <main>
        <div className='card-list'>
          {campaigns &&
            campaigns.map((Campaign) => {
              let {
                CampaignId,
                campaignName,
                campaignWebsite,
                campaginHashtag,
              } = Campaign;
              const urlObject = new URL(campaignWebsite);
              const cWebsite = urlObject.hostname;

              return (
                <Card className='card'>
                  <Card.Body>
                    <Card.Title>{campaignName}</Card.Title>
                    <Card.Text>
                      Campaign Hashtag: <span>#{campaginHashtag}</span>
                      <br />
                      Campaign Website: <span>{cWebsite}</span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {buttonPress ? (
                      <Button
                        className='btn'
                        variant='primary'
                        onClick={() =>
                          handleCampaignState(
                            CampaignId,
                            campaginHashtag,
                            campaignWebsite
                          )
                        }
                      >
                        Promote
                      </Button>
                    ) : (
                      <Button
                        className='btn'
                        variant='primary'
                        disabled
                        onClick={() =>
                          handleCampaignState(
                            CampaignId,
                            campaginHashtag,
                            campaignWebsite
                          )
                        }
                      >
                        Promote
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              );
            })}
        </div>
      </main>
    </body>
  );
};
