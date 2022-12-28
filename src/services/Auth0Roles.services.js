import axios from 'axios';
import { api } from '../const/api';

export const getRoles = async (userId) => {
  let result = await axios.get(`${api}roles/${userId}`);
  if (result.status === 200) {
    console.log(result.data);
    return result.data;
  } else {
    console.log('Getting the user role through the server is not succeeded');
    return {};
  }
};
