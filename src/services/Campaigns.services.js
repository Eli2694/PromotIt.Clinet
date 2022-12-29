import axios from 'axios';
import { api } from '../const/api';

export const RegisCampaign = async (Campaign) => {
  console.log(Campaign);
  await axios.post(`${api}addCampaign`, Campaign);
  alert('campagin successfully stored');
};
