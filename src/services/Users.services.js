import axios from 'axios';
import { api, userApi } from '../const/api';

export const checkIfUserExistsInDB = async (user) => {
  if (user === undefined) {
    alert('Checking if user exists in the database was unsuccessful - User');
  }
  try {
    await axios.post(`${api}LoginUsers`, user);
  } catch (error) {
    console.error(error);
  }
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

export const getUserID = async (Email) => {
  if (Email === undefined) {
    alert('Error in initialize wallet - User');
    return;
  }
  try {
    let results = await fetch(`${userApi}GETID/${Email}`);
    let userID = await results.json();
    return userID;
  } catch (error) {
    console.error(error);
  }
};

export const postOrderInfo = async (order) => {
  if (order === undefined) {
    alert('Error in post order info - User');
    return;
  }
  try {
    console.log(order);
    await axios.post(`${userApi}Order`, order);
    alert('successfully Purchase');
  } catch (error) {
    console.error(error);
  }
};

export const decreaseUnitsInStockByOne = async (ID) => {
  if (ID === undefined) {
    alert('Error in decrease Units In Stock By One - Users');
    return;
  }

  try {
    let endpoint = `${userApi}UpdateStock/${ID}`;
    await axios.put(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const InitializeWallet = async (Email) => {
  if (Email === undefined) {
    alert('Error in initialize wallet - User');
    return;
  }

  try {
    let endpoint = `${userApi}InitWallet/${Email}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const getUserMoney = async (Email) => {
  if (Email === undefined) {
    alert('Error getUserMoney - User');
    return;
  }
  try {
    let results = await fetch(`${userApi}GETUSERMONEY/${Email}`);
    let userMoney = await results.json();
    return userMoney;
  } catch (error) {
    console.error(error);
  }
};

export const AddMoneyToUser = async (Money, Email) => {
  if (Email === undefined || Money === undefined) {
    alert('Error AddMoneyToUser - users');
    return;
  }

  try {
    let endpoint = `${userApi}ADDMONEY/${Money}/${Email}`;
    await axios.put(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const DecreaseUserMoneyAfterBuy = async (Money, Email) => {
  if (Email === undefined || Money === undefined) {
    alert('Error DecreaseUserMoneyAfterBuy - Users');
    return;
  }

  try {
    let endpoint = `${userApi}DECREASEMONEY/${Money}/${Email}`;
    await axios.put(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const UpdateUserRole = async (Role, Email) => {
  if (Email === undefined || Role === undefined) {
    alert('Error UpdateUserRole - Users');
    return;
  }

  try {
    let endpoint = `${userApi}ROLES/${Role}/${Email}`;
    await axios.put(endpoint);
  } catch (error) {
    console.error(error);
  }
};
