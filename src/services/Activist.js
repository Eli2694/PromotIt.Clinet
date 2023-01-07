import axios from 'axios';
import { activistApi } from '../const/api';

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
