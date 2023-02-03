import { activistApi } from '../const/api';
import axios from 'axios';

export const getUserTwitterID = async (username) => {
  if (username === undefined) {
    alert('Error: Invalid username - getUserTwitterID');
    return;
  }
  try {
    let results = await fetch(`${activistApi}USERID/${username}`);
    let userObj = await results.json();
    console.log(userObj);
    return userObj;
  } catch (error) {
    console.error(error);
  }
};

export const getActivistPoints = async (Email) => {
  if (Email === undefined) {
    alert('getActivistPoints error');
    return;
  }
  try {
    let results = await fetch(`${activistApi}GETPOINTS/${Email}`);
    let userObj = await results.json();
    console.log(userObj);
    return userObj;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTweets = async (since, username, hashtag, website) => {
  if (
    username === undefined ||
    since === undefined ||
    website === undefined ||
    since === undefined
  ) {
    alert('getUserTweets error');
    console.log(username, since);
    return;
  }
  try {
    let results = await fetch(
      `${activistApi}USERTWEETS/${since}/${username}/${hashtag}/${website}`
    );
    let tweets = await results.json();
    console.log(tweets);
    return tweets;
  } catch (error) {
    console.error(error);
  }
};

export const ActivistPromoteCampaign = async (username, CampaignId, Email) => {
  if (
    CampaignId === undefined ||
    Email === undefined ||
    username === undefined
  ) {
    alert(
      `error: username=${username}, email=${Email},CampaignId=${CampaignId}`
    );
    return;
  }
  try {
    await axios.post(
      `${activistApi}INITIATECAMPAIGN/${CampaignId}/${Email}/${username}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const InitiateActivistPoints = async (Email) => {
  console.log(Email);
  if (Email === undefined) {
    alert('InitiateActivistPoints error');
    return;
  }
  try {
    await axios.post(`${activistApi}INITIATEPOINTS/${Email}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPoints = async (Email, Points) => {
  if (Email === undefined || Points === undefined) {
    alert('updateUserPoints error');
    return;
  }
  try {
    await axios.put(`${activistApi}UPDATEPOINTS/${Email}/${Points}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateTweetsAmountPerCampaign = async (
  tweets,
  Email,
  campaignId
) => {
  console.log(tweets, Email, campaignId);
  if (Email === undefined || tweets === undefined || campaignId === undefined) {
    alert('updateTweetsAmountPerCampaign error');
    return;
  }
  try {
    await axios.put(
      `${activistApi}UPDATETWEETSAMOUNT/${Email}/${tweets}/${campaignId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const DecreaseActivistPointsAfterBuy = async (dropPoints, Email) => {
  if (Email === undefined || dropPoints === undefined) {
    alert('error DecreaseActivistPointsAfterBuy');
    return;
  }
  try {
    await axios.put(`${activistApi}DROPOINTS/${Email}/${dropPoints}`);
  } catch (error) {
    console.log(error);
  }
};

//sendTwitterMessage

export const sendTwitterMessage = async (username, companyName) => {
  if (username === undefined || companyName === undefined) {
    alert('error sendTwitterMessage');
    return;
  }
  try {
    await axios.post(`${activistApi}TWITTERMESSAGE/${username}/${companyName}`);
  } catch (error) {
    console.log(error);
  }
};
