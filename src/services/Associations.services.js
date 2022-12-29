import axios from 'axios';
import { api } from '../const/api';

export const RegisterAssociation = async (Association) => {
  console.log(Association);
  await axios.post(`${api}Association`, Association);
  alert('Association successfully stored');
};
