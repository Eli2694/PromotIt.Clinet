import { ownerApi } from '../const/api';

export const getUserStatistics = async () => {
  try {
    let results = await fetch(`${ownerApi}GET`);
    let users = await results.json();
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getNonprofitUsers = async () => {
  try {
    let results = await fetch(`${ownerApi}GETNONPROFIT`);
    let users = await results.json();
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getBusinessUsers = async () => {
  try {
    let results = await fetch(`${ownerApi}GETBUSINESS`);
    let users = await results.json();
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getActivistUsers = async () => {
  try {
    let results = await fetch(`${ownerApi}GETACTIVIST`);
    let users = await results.json();

    return users;
  } catch (error) {
    console.error(error);
  }
};

//Campaign Report ----------------------------------------

export const getCampaignStatistics = async () => {
  try {
    let results = await fetch(`${ownerApi}CAMPAIGNSTATS`);
    let users = await results.json();

    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getTotalCampaignInfo = async (date) => {
  if (date === undefined) {
    alert('Please select a date');
    return;
  }
  try {
    let results = await fetch(`${ownerApi}GETOTALCAMPAIGNS/${date}`);
    let users = await results.json();

    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getDonationCampaignInfo = async (date) => {
  if (date === undefined) {
    alert('Please select a date');
    return;
  }
  try {
    let results = await fetch(`${ownerApi}GETCAMPAIGNDONATION/${date}`);
    let users = await results.json();

    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getTweetsCampaignInfo = async (date) => {
  if (date === undefined) {
    alert('Please select a date');
    return;
  }
  try {
    let results = await fetch(`${ownerApi}GETCAMPAIGNTWEETS/${date}`);
    let users = await results.json();

    return users;
  } catch (error) {
    console.error(error);
  }
};
