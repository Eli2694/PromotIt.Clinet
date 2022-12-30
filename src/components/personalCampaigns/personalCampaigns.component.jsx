import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  delCampaign,
  getPersonalCampaigns,
} from '../../services/Campaigns.services';
import { PersonalCampRowDisplay } from '../personalCampRowDisplay/personalCampRowDisplay.component';

export const PersonalCampaigns = () => {
  const [campaigns, setCampaings] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [Email] = useState(user.email);

  const updateCampaign = async (CampaignId) => {
    //let CampaignOjc = await getCampaignID(campaignWebsite);
    //let CampaignID = CampaignOjc.CampaignID;
    navigate('/updateCampaign', {
      state: {
        CampaignId,
      },
    });
  };

  const deleteCampaign = async (CampaignId) => {
    await delCampaign(CampaignId);
    await ListOfPersonalCampaigns();
  };

  const ListOfPersonalCampaigns = async () => {
    let PersCampaigns = await getPersonalCampaigns(Email);
    setCampaings(PersCampaigns);
  };

  useEffect(() => {
    ListOfPersonalCampaigns();
  }, []);

  return (
    <>
      <h1>Personal Campaigns</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Campaign Website</th>
            <th>Campaign Hashtag</th>
            <th>Update Campaign</th>
            <th>Delete Campaign</th>
          </tr>
        </thead>
        <tbody>
          {campaigns &&
            campaigns.map((campaigns) => {
              const {
                campaignName,
                campaignWebsite,
                campaginHashtag,
                CampaignId,
              } = campaigns;
              return (
                <PersonalCampRowDisplay
                  name={campaignName}
                  website={campaignWebsite}
                  hashtag={campaginHashtag}
                  handleUpdate={() => updateCampaign(parseInt(CampaignId))}
                  handleDelete={() => deleteCampaign(CampaignId)}
                ></PersonalCampRowDisplay>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
