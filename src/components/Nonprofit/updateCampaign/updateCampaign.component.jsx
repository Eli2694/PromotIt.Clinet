import React, { useContext, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from '../../../context/role.context';
import { UpdaCampaign } from '../../../services/Campaigns.services';
import './updateCampaign.css';

export const UpdateCampaign = () => {
  const [campaignName, setCampaignName] = useState();
  const [campaignWebsite, setCampaignWebsite] = useState();
  const [campaginHashtag, setCampaignHashtag] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useContext(RoleContext);

  const { CampaignId, campaignInfo } = location.state
    ? location.state
    : { CampaignId: null, campaignInfo: null };

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

  if (role.find((role) => role.name === 'NonProfitRepresentative')) {
    return (
      <>
        <div className='campaign-info'>
          {' '}
          <Card bg='info' style={{ width: '18rem' }}>
            <Card.Header>Campaign</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                Campaign Name: {campaignInfo.campaignName}
              </ListGroup.Item>
              <ListGroup.Item>
                Campaign Hashtag: {campaignInfo.campaginHashtag}
              </ListGroup.Item>
              <ListGroup.Item>
                Campaign Website {campaignInfo.campaignWebsite}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <div className='campaginUpdate'>
          <h2>Update Campaign</h2>
          <form onSubmit={handleUpdate}>
            <label>Campaign Name</label>
            <input
              type='text'
              required
              onChange={(e) =>
                setCampaignName(e.target.value.replace(/'/g, ''))
              }
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
            <button>Update</button>
            <button onClick={() => navigate('/personalCampaigns')}>
              Go Back
            </button>
          </form>
        </div>
      </>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
