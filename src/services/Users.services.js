import axios from 'axios';
import { api, userApi } from '../const/api';

export const checkIfUserExistsInDB = async (user) => {
  await axios.post(`${api}Users`, user);
};

export const getFullListOfCampaigns = async () => {
  try {
    let results = await fetch(`${userApi}GET`);
    let campaigns = await results.json();
    return campaigns;
  } catch (error) {
    console.error(error);
  }
};
