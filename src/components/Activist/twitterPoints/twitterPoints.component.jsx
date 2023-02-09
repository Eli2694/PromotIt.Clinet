import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { RoleContext } from '../../../context/role.context';
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
import {
  getFullListOfCampaigns,
  UpdateUserRole,
} from '../../../services/Users.services';
import './twitterPoints.css';

export const TwitterPoints = () => {
  const { points, setPoints } = useContext(TwitterWalletContext);
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [campaignId, setCampaignId] = useState();
  const [hashtag, setHashtag] = useState();
  const [website, setWebsite] = useState();
  const [campaigns, setCampaigns] = useState([]);
  const [buttonPress, setButtonPress] = useState(true);
  const { user } = useAuth0();
  const { role } = useContext(RoleContext);

  // Update User Role in sql server from null to activist
  const UpdateRole = async () => {
    let userRole = role[0].name;
    let email = user.email;
    await UpdateUserRole(userRole, email);
  };

  const handleCampaignState = async (
    CampaignId,
    campaginHashtag,
    campaignWebsite
  ) => {
    // Removes https:// from a website to improve display
    const urlObject = new URL(campaignWebsite);
    const cWebsite = urlObject.hostname;

    // Update state of campaign to promote
    setCampaignId(CampaignId);
    setHashtag(campaginHashtag);
    setWebsite(cWebsite);
  };

  const FullInfoAboutCampaigns = async () => {
    // Get all campaigns that the user can promote
    let Campaigns = await getFullListOfCampaigns();

    // Every Activist start with 0 points
    let Email = user.email;
    await InitiateActivistPoints(Email);

    let points = await getActivistPoints(Email);
    setPoints(points);
    setCampaigns(Campaigns);
  };

  useEffect(() => {
    FullInfoAboutCampaigns();
    UpdateRole();
  }, []);

  const finalizeUsernameChange = async (e) => {
    if (
      campaignId === undefined ||
      hashtag === undefined ||
      website === undefined
    ) {
      alert('Please select a campaign to promote');
      return;
    }
    e.preventDefault();
    setUsername(e.target.value);
    setButtonPress(false);

    let userObj = await getUserTwitterID(username);
    setUserInfo(userObj.data[0]);

    let Email = user.email;
    // Choose campaign to promote by pressing the button "Promote"
    await ActivistPromoteCampaign(username, campaignId, Email);
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
            website.
          </p>
          <p>4.Your points will be updated around every hour"</p>
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
                <Card className='twitter-card'>
                  <Card.Body>
                    <Card.Title className='Twitter-campaignTitle'>
                      {campaignName}
                    </Card.Title>
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
