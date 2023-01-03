import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../../context/role.context';
import { GetCampaignsListForBusiness } from '../../../services/Business.services';
import { BusinessRow } from '../businessRow/businessRow.component';

export const BusinessCampaigns = () => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const [campaignsList, setCampaignsList] = useState([]);
  //const [productsOfOneCampaign,setProductsOfOneCampaign] = useState([]);

  const DonateToCampaign = (CampaignId) => {
    navigate('/DonateProduct', {
      state: {
        CampaignId,
      },
    });
  };

  const SendCampaignIdToGetProducts = async (CampaignId) => {
    navigate('/BusinessRepProducts', {
      state: {
        CampaignId,
      },
    });
  };

  const ListOfCampaigns = async () => {
    let allCampaigns = await GetCampaignsListForBusiness();
    setCampaignsList(allCampaigns);
  };

  useEffect(() => {
    ListOfCampaigns();
  }, []);

  if (role.find((role) => role.name === 'BusinessRepresentative')) {
    return (
      <>
        <h1>List Of Campaigns</h1>
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
