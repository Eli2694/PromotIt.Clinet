import axios from 'axios';
import { api, userApi } from '../const/api';

export const checkIfUserExistsInDB = async (user) => {
  if (user === null) {
    alert('Checking if user exists in the database was unsuccessful');
  }
  await axios.post(`${api}LoginUsers`, user);
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
  try {
    let results = await fetch(`${userApi}GETID/${Email}`);
    let userID = await results.json();
    return userID;
  } catch (error) {
    console.error(error);
  }
};

export const postOrderInfo = async (order) => {
  if (order === null || order === undefined) {
    alert('Error in post order info');
    return;
  }
  try {
    console.log(order);
    await axios.post(`${userApi}Order`, order);
    alert('Buyer Inforamtion successfully added');
  } catch (error) {
    console.error(error);
  }
};

export const decreaseUnitsInStockByOne = async (ID) => {
  if (ID === null || ID === undefined) {
    alert('Error in decrease Units In Stock By One');
    return;
  }

  try {
    let endpoint = `${userApi}UpdateStock/${ID}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const InitializeWallet = async (Email) => {
  if (Email === null || Email === undefined) {
    alert('Error in initialize wallet');
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
  if (Email === null || Email === undefined) {
    alert('Error in getting user money from database');
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
  if (Email === null || Email === undefined || !Money) {
    alert('Error in adding user money to database');
    return;
  }

  try {
    let endpoint = `${userApi}ADDMONEY/${Money}/${Email}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const DecreaseUserMoneyAfterBuy = async (Money, Email) => {
  if (Email === null || Email === undefined || !Money) {
    alert('Error in decreasing user money after buying');
    return;
  }

  try {
    let endpoint = `${userApi}DECREASEMONEY/${Money}/${Email}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};
