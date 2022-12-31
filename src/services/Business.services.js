import axios from 'axios';
import { businessApi } from '../const/api';

export const GetCampaignsListForBusiness = async () => {
  try {
    let results = await fetch(`${businessApi}GET`);
    let campaigns = await results.json();
    console.log(campaigns);
    return campaigns;
  } catch (error) {
    console.error(error);
  }
};

export const Donate = async (product) => {
  try {
    console.log(product);
    await axios.post(`${businessApi}Donate`, product);

    alert('product successfully donated');
  } catch (error) {
    console.error(error);
  }
};

export const getCampaignProducts = async (ID) => {
  try {
    let results = await fetch(`${businessApi}GETPRODUCTS/${ID}`);
    let products = await results.json();
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const delProduct = async (campaignId, productName) => {
  try {
    let endpoint = `${businessApi}DELETEPRPDUCT/${campaignId}/${productName}`;
    await axios.delete(endpoint);
    alert('Product successfully deleted');
  } catch (error) {
    console.error(error);
  }
};

export const getProductId = async (campaginId, productName) => {
  try {
    let results = await fetch(
      `${businessApi}GETPRODUCTID/${campaginId}/${productName}`
    );
    let productID = await results.json();
    console.log(productID);
    return productID;
  } catch (error) {
    console.error(error);
  }
};

export const UpdProduct = async (product) => {
  try {
    await axios.post(`${businessApi}Update`, product);
    alert('product successfully updated');
  } catch (error) {
    console.error(error);
  }
};
