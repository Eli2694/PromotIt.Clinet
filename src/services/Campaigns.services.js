import axios from 'axios';
import { campaignApi } from '../const/api';

// export const RegisCampaign = async (Campaign) => {
//   console.log(Campaign);
//   await axios.post(`${api}addCampaign`, Campaign);
//   alert('campagin successfully stored');
// };

export const RegisCampaign = async (Campaign) => {
  try {
    await axios.post(`${campaignApi}ADD`, Campaign);
    alert('campagin successfully stored');
  } catch (error) {
    console.error(error);
  }
};

export const getPersonalCampaigns = async (Email) => {
  try {
    let results = await fetch(`${campaignApi}GET/${Email}`);
    let campaign = await results.json();
    return campaign;
  } catch (error) {
    console.error(error);
  }
};

export const delCampaign = async (ID) => {
  try {
    let endpoint = `${campaignApi}DELETE/${ID}`;
    await axios.delete(endpoint);
    alert('campagin successfully deleted');
  } catch (error) {
    console.error(error);
  }
};

export const getCampaignID = async (website) => {
  try {
    let results = await fetch(`${campaignApi}GETID/${website}`);
    let campaign = await results.json();
    return campaign;
  } catch (error) {
    console.error(error);
  }
};

export const UpdaCampaign = async (UpdatedCampaign) => {
  try {
    await axios.post(`${campaignApi}Update`, UpdatedCampaign);
    alert('campagin successfully updated');
  } catch (error) {
    console.error(error);
  }
};
