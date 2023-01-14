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
  if (product === undefined) {
    alert('error: Donate - Business Product');
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
  if (ID === undefined || Email === undefined) {
    alert('error: getCampaignProducts - Business services');
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
  if (ID === undefined) {
    alert('Getting products was not successful  - Business services');
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
  if (campaignId === undefined || productName === undefined) {
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
  if (CampaignId === undefined || productName === undefined) {
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
  if (product === undefined) {
    alert(
      'Updating product was not successful because product was not found - Business Services'
    );
    return;
  }
  console.log(product);

  try {
    await axios.put(`${businessApi}Update`, product);
    alert('product successfully updated - Business Services');
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersOfMyProduct = async (Email) => {
  if (Email === undefined) {
    alert(
      'Getting orders of my products  was not successful because email was not found - Business Services'
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
  if (orderId === undefined || Email === undefined) {
    alert(
      'Confirmation of order was not successful because the orderId was not provided or the email was not provided - Business Services'
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

export const RegisCompany = async (Company) => {
  if (Company === undefined) {
    alert('error - Register company');
    return;
  }
  try {
    console.log(Company);
    await axios.post(`${businessApi}REGISTER`, Company);
    alert('Association successfully stored');
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessCompanyName = async (productId) => {
  if (productId === undefined) {
    alert('Problem in getBusinessCompanyName  - Business Services');
    return;
  }
  try {
    let results = await fetch(`${businessApi}GETCOMPANYNAME/${productId}`);
    let productID = await results.json();

    return productID;
  } catch (error) {
    console.error(error);
  }
};
