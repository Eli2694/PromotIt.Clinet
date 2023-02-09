import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../../context/role.context';
import {
  delCampaign,
  getPersonalCampaigns,
} from '../../../services/Campaigns.services';
import { UpdateUserRole } from '../../../services/Users.services';
import { PersonalCampRowDisplay } from '../personalCampRowDisplay/personalCampRowDisplay.component';

export const PersonalCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);
  const { user } = useAuth0();
  //const [Email] = useState(user.email);

  const UpdateRole = async () => {
    let userRole = role[0].name;
    let email = user.email;
    await UpdateUserRole(userRole, email);
  };

  //Collect info about campaign that will help me update its information
  const updateCampaign = (
    CampaignId,
    campaignName,
    campaignWebsite,
    campaginHashtag
  ) => {
    let campaignInfo = {
      campaignName,
      campaignWebsite,
      campaginHashtag,
    };
    navigate('/updateCampaign', {
      state: {
        CampaignId,
        campaignInfo,
      },
    });
  };

  //Delete campaign from DB and receive updated list of personal campaigns
  const deleteCampaign = async (CampaignId) => {
    await delCampaign(CampaignId);
    await ListOfPersonalCampaigns();
  };

  //Every Nonprofit user has its own campaigns
  const ListOfPersonalCampaigns = async () => {
    let PersonalCampaigns = await getPersonalCampaigns(user.email);
    setCampaigns(PersonalCampaigns);
  };

  useEffect(() => {
    ListOfPersonalCampaigns();
    UpdateRole();
  }, []);

  if (role.find((role) => role.name === 'NonProfitRepresentative')) {
    return (
      <>
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
                const urlObject = new URL(campaignWebsite);
                const websiteName = urlObject.hostname;
                return (
                  <PersonalCampRowDisplay
                    name={campaignName}
                    website={websiteName}
                    hashtag={campaginHashtag}
                    handleUpdate={() =>
                      updateCampaign(
                        parseInt(CampaignId),
                        campaignName,
                        campaignWebsite,
                        campaginHashtag
                      )
                    }
                    handleDelete={() => deleteCampaign(CampaignId)}
                  ></PersonalCampRowDisplay>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
