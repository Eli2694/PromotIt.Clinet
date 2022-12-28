import axios from 'axios';
import { api } from '../const/api';

export const checkIfUserExistsInDB = async (user) => {
  await axios.post(`${api}Users`, user);
};
