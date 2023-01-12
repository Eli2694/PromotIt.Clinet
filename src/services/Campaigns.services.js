import axios from 'axios';
import { campaignApi } from '../const/api';

export const RegisCampaign = async (Campaign) => {
  if (Campaign === undefined) {
    alert('Campaign  was not successfully registered - Campaign');
    return;
  }
  try {
    await axios.post(`${campaignApi}ADD`, Campaign);
    alert('Campaign is successfully stored');
  } catch (error) {
    console.error(error);
  }
};

export const getPersonalCampaigns = async (Email) => {
  if (Email === undefined) {
    alert('Getting Personal Campaigns was not successful');
    return;
  }
  try {
    let results = await fetch(`${campaignApi}GET/${Email}`);
    let campaign = await results.json();
    return campaign;
  } catch (error) {
    console.error(error);
  }
};

export const delCampaign = async (ID) => {
  if (ID === undefined) {
    alert('Campaign  was not successfully Deleted');
    return;
  }
  try {
    let endpoint = `${campaignApi}DELETE/${ID}`;
    await axios.delete(endpoint);
    alert('Campaign successfully deleted');
  } catch (error) {
    console.error(error);
  }
};

export const UpdaCampaign = async (UpdatedCampaign) => {
  if (UpdatedCampaign === undefined) {
    alert('Campaign  was not successfully Updated');
    return;
  }

  try {
    await axios.post(`${campaignApi}Update`, UpdatedCampaign);
    alert('Campaign successfully updated');
  } catch (error) {
    console.error(error);
  }
};

export const getCampaignID = async (ProductID) => {
  if (ProductID === undefined) {
    alert('Getting  Campaigns ID was not successful');
    return;
  }
  try {
    let results = await fetch(`${campaignApi}GETCAMPAIGNID/${ProductID}`);
    let campaign = await results.json();
    return campaign;
  } catch (error) {
    console.error(error);
  }
};

export const postCampaignDonationAmount = async (CampaignID, unitPrice) => {
  if (CampaignID === undefined || unitPrice === undefined) {
    alert('Campaign Donation Amount was not successfully Updated');
    return;
  }

  try {
    await axios.post(`${campaignApi}DONATIONAMOUNT/${CampaignID}/${unitPrice}`);
  } catch (error) {
    console.error(error);
  }
};
