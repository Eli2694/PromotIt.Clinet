import { activistApi } from '../const/api';
import axios from 'axios';

export const getUserTwitterID = async (username) => {
  if (!username) {
    alert('username is invalid');
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

export const getUserTweets = async (username, since) => {
  if (!username || !since) {
    alert('userId or since  are required');
    console.log(username, since);
    return;
  }
  try {
    let results = await fetch(`${activistApi}USERTWEETS/${username}/${since}`);
    let tweets = await results.json();
    console.log(tweets);
    return tweets;
  } catch (error) {
    console.error(error);
  }
};
