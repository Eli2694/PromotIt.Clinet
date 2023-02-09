import axios from 'axios';
import { api } from '../const/api';

export const RegisterAssociation = async (Association) => {
  if (Association === undefined) {
    alert('Association is required');
    return;
  }
  console.log(Association);
  await axios.post(`${api}Association`, Association);
  alert('Association successfully stored');
};
