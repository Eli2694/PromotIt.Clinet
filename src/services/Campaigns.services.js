import axios from 'axios';
import { campaignApi } from '../const/api';

export const RegisCampaign = async (Campaign) => {
  if (!Campaign) {
    alert('Campaign  was not successfully registered');
    return;
  }
  try {
    await axios.post(`${campaignApi}ADD`, Campaign);
    alert('campagin successfully stored');
  } catch (error) {
    console.error(error);
  }
};

export const getPersonalCampaigns = async (Email) => {
  if (!Email) {
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
  if (!ID) {
    alert('Campaign  was not successfully Deleted');
    return;
  }
  try {
    let endpoint = `${campaignApi}DELETE/${ID}`;
    await axios.delete(endpoint);
    alert('campagin successfully deleted');
  } catch (error) {
    console.error(error);
  }
};

export const UpdaCampaign = async (UpdatedCampaign) => {
  if (!UpdatedCampaign) {
    alert('Campaign  was not successfully Updated');
    return;
  }

  try {
    await axios.post(`${campaignApi}Update`, UpdatedCampaign);
    alert('campagin successfully updated');
  } catch (error) {
    console.error(error);
  }
};

export const getCampaignID = async (ProductID) => {
  if (!ProductID) {
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
  if (!CampaignID || !unitPrice) {
    alert('Campaign Donation Amount was not successfully Updated');
    return;
  }

  try {
    await axios.post(`${campaignApi}DONATIONAMOUNT/${CampaignID}/${unitPrice}`);
    alert('Donation to campaign was successfully updated');
  } catch (error) {
    console.error(error);
  }
};
