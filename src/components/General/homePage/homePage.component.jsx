import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductsListContext } from '../../../context/listOfProducts';
import { getCProducts } from '../../../services/Business.services';
import { getFullListOfCampaigns } from '../../../services/Users.services';
import { HomePageRow } from '../homePageRow/homePageRow.components';

export const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { setProductsList } = useContext(ProductsListContext);
  const navigate = useNavigate();

  const handleCampaignProducts = async (CampaignId) => {
    let campaignProducts = await getCProducts(CampaignId);
    setProductsList(campaignProducts);
    navigate('/usersProducts');
  };

  const FullInfoAboutCampaigns = async () => {
    let Campaigns = await getFullListOfCampaigns();
    setCampaigns(Campaigns);
  };

  useEffect(() => {
    FullInfoAboutCampaigns();
  }, []);

  return (
    <main>
      {' '}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Association</th>
            <th>Association Website</th>
            <th>Campaign Name</th>
            <th>Campaign Website</th>
            <th>Campaign Hashtag</th>
            <th>Campaign Products</th>
          </tr>
        </thead>
        <tbody>
          {campaigns &&
            campaigns.map((info) => {
              const {
                CampaignId,
                AssociationName,
                AssociationWebsite,
                campaignName,
                campaignWebsite,
                campaginHashtag,
              } = info;
              const urlObject = new URL(campaignWebsite);
              const urlObject2 = new URL(AssociationWebsite);
              const cWebsite = urlObject.hostname;
              const aWebsite = urlObject2.hostname;
              return (
                <HomePageRow
                  AssociationName={AssociationName}
                  AssociationWebsite={aWebsite}
                  campaignName={campaignName}
                  campaignWebsite={cWebsite}
                  campaginHashtag={campaginHashtag}
                  handleProductsList={() => handleCampaignProducts(CampaignId)}
                ></HomePageRow>
              );
            })}
        </tbody>
      </Table>
    </main>
  );
};
