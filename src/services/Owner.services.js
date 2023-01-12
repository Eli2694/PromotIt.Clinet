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
