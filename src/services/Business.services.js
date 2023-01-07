import axios from 'axios';
import { businessApi } from '../const/api';

export const GetCampaignsListForBusiness = async () => {
  try {
    let results = await fetch(`${businessApi}GET`);
    let campaigns = await results.json();
    return campaigns;
  } catch (error) {
    console.error(error);
  }
};

export const Donate = async (product) => {
  if (!product) {
    alert('The donation was not successful');
    return;
  }
  try {
    console.log(product);
    await axios.post(`${businessApi}Donate`, product);
    alert('product successfully donated');
  } catch (error) {
    console.error(error);
  }
};

export const getCampaignProducts = async (ID, Email) => {
  if (!ID || !Email) {
    alert('Getting the campaigns was not successful');
    return;
  }
  try {
    let results = await fetch(`${businessApi}GETPRODUCTS/${ID}/${Email}`);
    let products = await results.json();
    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const getCProducts = async (ID) => {
  if (!ID) {
    alert('Getting products was not successful');
    return;
  }
  try {
    let results = await fetch(`${businessApi}PRODUCTS/${ID}`);
    let products = await results.json();
    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const delProduct = async (campaignId, productName) => {
  if (!campaignId || !productName) {
    alert(
      'Deleting product was not successful because the campaign ID is invalid or the product name is invalid'
    );
    return;
  }
  try {
    let endpoint = `${businessApi}DELETEPRPDUCT/${campaignId}/${productName}`;
    await axios.delete(endpoint);
    alert('Product successfully deleted');
  } catch (error) {
    console.error(error);
  }
};

export const getProductId = async (CampaignId, productName) => {
  if (!CampaignId || !productName) {
    alert(
      'Getting product ID not successful because the campaign ID is invalid or the product name is invalid'
    );
    return;
  }
  try {
    let results = await fetch(
      `${businessApi}GETPRODUCTID/${CampaignId}/${productName}`
    );
    let productID = await results.json();

    return productID;
  } catch (error) {
    console.error(error);
  }
};

export const UpdProduct = async (product) => {
  if (!product) {
    alert('Updating product was not successful because product was not found');
    return;
  }
  console.log(product);
  try {
    await axios.post(`${businessApi}Update`, product);
    alert('product successfully updated');
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersOfMyProduct = async (Email) => {
  if (!Email) {
    alert(
      'Getting orders of my products  was not successful because email was not found'
    );
    return;
  }
  try {
    let results = await fetch(`${businessApi}GETORDERS/${Email}`);
    let Orders = await results.json();
    console.log(Orders);
    return Orders;
  } catch (error) {
    console.error(error);
  }
};

export const ConfirmOrder = async (orderId, Email) => {
  if (!orderId || !Email) {
    alert(
      'Confirmation of order was not successful because the orderId was not provided or the email was not provided'
    );
    return;
  }
  try {
    await axios.post(`${businessApi}CONFIRMORDER/${orderId}/${Email}`);
    alert('Order Confirmed Successfully');
  } catch (error) {
    console.error(error);
  }
};
