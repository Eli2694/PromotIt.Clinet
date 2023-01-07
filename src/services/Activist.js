import { activistApi, expressSeverAPI } from '../const/api';

export const getCampaignHashtag = async () => {
  try {
    let results = await fetch(`${activistApi}GETHASHTAG/`);
    let Hashtags = await results.json();
    return Hashtags;
  } catch (error) {
    console.error(error);
  }
};

export const getCampaignWebsites = async () => {
  try {
    let results = await fetch(`${activistApi}GETWEBSITE/`);
    let Websites = await results.json();
    return Websites;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTwitterID = async (username) => {
  if (!username) {
    alert('username is invalid');
    return;
  }
  try {
    let results = await fetch(`${expressSeverAPI}username/${username}`);
    let id = await results.json();
    return id;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTimelineForTweets = async () => {
  try {
    let results = await fetch(`${expressSeverAPI}setTimeline`);
    let timeline = await results.json();
    return timeline;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTweetsLastHour = async (userId, timeLine) => {
  if (!userId || !timeLine) {
    alert('userId and timeLine are required');
    return;
  }
  try {
    console.log(timeLine);
    let results = await fetch(
      `${expressSeverAPI}userTweets/${userId}/${timeLine}`
    );
    let timeline = await results.json();
    return timeline;
  } catch (error) {
    console.error(error);
  }
};
