import axios from 'axios';
import { api, userApi } from '../const/api';

export const checkIfUserExistsInDB = async (user) => {
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
  try {
    console.log(order);
    await axios.post(`${userApi}Order`, order);
    alert('Buyer Inforamtion successfully added');
  } catch (error) {
    console.error(error);
  }
};

export const decreaseUnitsInStockByOne = async (ID) => {
  try {
    let endpoint = `${userApi}UpdateStock/${ID}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const InitializeWallet = async (Email) => {
  try {
    let endpoint = `${userApi}InitWallet/${Email}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const getUserMoney = async (Email) => {
  try {
    let results = await fetch(`${userApi}GETUSERMONEY/${Email}`);
    let userMoney = await results.json();
    return userMoney;
  } catch (error) {
    console.error(error);
  }
};

export const AddMoneyToUser = async (Money, Email) => {
  try {
    let endpoint = `${userApi}ADDMONEY/${Money}/${Email}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};

export const DecreaseUserMoneyAfterBuy = async (Money, Email) => {
  try {
    let endpoint = `${userApi}DECREASEMONEY/${Money}/${Email}`;
    await axios.post(endpoint);
  } catch (error) {
    console.error(error);
  }
};
