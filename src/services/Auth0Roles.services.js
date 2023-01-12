import axios from 'axios';
import { api } from '../const/api';

export const getRoles = async (userId) => {
  if (userId === undefined) {
    alert('error: getRoles');
    return;
  }
  let result = await axios.get(`${api}roles/${userId}`);
  if (result.status === 200) {
    return result.data;
  } else {
    console.log('Getting the user role through the server is not succeeded');
    return {};
  }
};
