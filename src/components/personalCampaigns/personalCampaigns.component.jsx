import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  delCampaign,
  getCampaignID,
  getPersonalCampaigns,
} from '../../services/Campaigns.services';
import { PersonalCampRowDisplay } from '../personalCampRowDisplay/personalCampRowDisplay.component';

export const PersonalCampaigns = () => {
  const [campaigns, setCampaings] = useState([]);
  const navigate = useNavigate();

  const updateCampaign = async (campaignWebsite) => {
    let CampaignOjc = await getCampaignID(campaignWebsite);
    let CampaignID = CampaignOjc.CampaignID;
    navigate('/updateCampaign', {
      state: {
        CampaignID,
      },
    });
  };

  const deleteCampaign = async (campaignWebsite) => {
    await delCampaign(campaignWebsite);
  };

  const ListOfPersonalCampaigns = async (ProductId) => {
    let PersCampaigns = await getPersonalCampaigns(ProductId);
    let PersCampaignsArr = Object.values(PersCampaigns);
    setCampaings(PersCampaignsArr);
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
              const { campaignName, campaignWebsite, campaginHashtag } =
                campaigns;
              return (
                <PersonalCampRowDisplay
                  name={campaignName}
                  website={campaignWebsite}
                  hashtag={campaginHashtag}
                  handleUpdate={() => updateCampaign(campaignWebsite)}
                  handleDelete={() => deleteCampaign(campaignWebsite)}
                ></PersonalCampRowDisplay>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
