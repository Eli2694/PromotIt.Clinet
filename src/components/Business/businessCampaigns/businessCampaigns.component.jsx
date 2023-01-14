import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../../context/role.context';
import { GetCampaignsListForBusiness } from '../../../services/Business.services';
import { UpdateUserRole } from '../../../services/Users.services';
import { BusinessRow } from '../businessRow/businessRow.component';

export const BusinessCampaigns = () => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const [campaignsList, setCampaignsList] = useState([]);

  const { user } = useAuth0();

  //Update User role to Business Representative
  const UpdateRole = async () => {
    let userRole = role[0].name;
    let email = user.email;
    await UpdateUserRole(userRole, email);
  };

  //Bring Campaign ID to Purchase form page with useNavigate hook
  const DonateToCampaign = (CampaignId) => {
    navigate('/DonateProduct', {
      state: {
        CampaignId,
      },
    });
  };

  //Business Representative need to see his the products he donated to be able to update or delete them.
  const SendCampaignIdToGetProducts = async (CampaignId) => {
    navigate('/BusinessRepProducts', {
      state: {
        CampaignId,
      },
    });
  };

  // Business Representative need to choose campaign and donate to it
  const ListOfCampaigns = async () => {
    let allCampaigns = await GetCampaignsListForBusiness();
    setCampaignsList(allCampaigns);
  };

  useEffect(() => {
    ListOfCampaigns();
    UpdateRole();
  }, []);

  if (role.find((role) => role.name === 'BusinessRepresentative')) {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Campaign Website</th>
              <th>Campaign Hashtag</th>
              <th>Donate Product</th>
              <th>See Products</th>
            </tr>
          </thead>
          <tbody>
            {campaignsList &&
              campaignsList.map((campaigns) => {
                const {
                  campaignName,
                  campaignWebsite,
                  campaginHashtag,
                  CampaignId,
                } = campaigns;
                const urlObject = new URL(campaignWebsite);
                const websiteName = urlObject.hostname;
                return (
                  <BusinessRow
                    name={campaignName}
                    website={websiteName}
                    hashtag={campaginHashtag}
                    handleDonate={() => DonateToCampaign(parseInt(CampaignId))}
                    handleDisplay={() =>
                      SendCampaignIdToGetProducts(parseInt(CampaignId))
                    }
                  ></BusinessRow>
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
