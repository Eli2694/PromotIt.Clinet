import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductIdContext } from '../../../context/productID.context';
import { WalletContext } from '../../../context/wallet';
import {
  getCampaignID,
  postCampaignDonation,
  postCampaignDonationAmount,
} from '../../../services/Campaigns.services';
import {
  decreaseUnitsInStockByOne,
  DecreaseUserMoneyAfterBuy,
  getUserID,
  postOrderInfo,
} from '../../../services/Users.services';
import './buyerForm.css';

export const BuyerForm = () => {
  const [userId, setUserId] = useState();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [homeAddress, setHomeAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const { productId } = useContext(ProductIdContext);
  const { wallet, setWallet } = useContext(WalletContext);
  const location = useLocation();

  // I need unitPrice for updating the amount of currency
  const { unitPrice } = location.state ? location.state : { unitPrice: null };

  const ReceiveUserId = async () => {
    let id = getUserID(user.email);
    let resolvedId = await id;
    setUserId(resolvedId);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();

    let order = {
      userId,
      productId,
      country,
      city,
      homeAddress,
      postalCode,
      phoneNumber,
    };
    let campaignID = await getCampaignID(productId);
    // Every time user buy a product, its money goes to the campaign
    await postCampaignDonationAmount(campaignID, unitPrice);
    // save product order in database
    await postOrderInfo(order);
    // decrease amount of units in stock of the product that was purchased
    await decreaseUnitsInStockByOne(productId);
    let UserMoneyAfterPurchase = parseFloat(wallet) - parseFloat(unitPrice);
    console.log(UserMoneyAfterPurchase);

    let Email = user.email;
    // update user money after purchase
    await DecreaseUserMoneyAfterBuy(unitPrice, Email);
    setWallet(UserMoneyAfterPurchase.toString());
    navigate('/');
  };

  useEffect(() => {
    ReceiveUserId();
  }, []);

  return (
    <div className='purchase'>
      <h2>Buyer Details</h2>
      <form onSubmit={handlePurchase}>
        <label>Country</label>
        <input
          type='text'
          required
          onChange={(e) => setCountry(e.target.value.replace(/'/g, ''))}
        />
        <label>City</label>
        <input
          type='text'
          required
          onChange={(e) => setCity(e.target.value.replace(/'/g, ''))}
        />
        <label>Home Address</label>
        <input
          type='text'
          required
          onChange={(e) => setHomeAddress(e.target.value.replace(/'/g, ''))}
        />
        <label>Postal Code</label>
        <input
          type='number'
          required
          onChange={(e) =>
            setPostalCode(e.target.value.toString().replace(/'/g, ''))
          }
        />
        <label>Phone Number</label>
        <input
          type='number'
          required
          onChange={(e) =>
            setPhoneNumber(e.target.value.toString().replace(/'/g, ''))
          }
        />
        <button>Send</button>
        <button onClick={() => navigate('/usersProducts')}>Go Back</button>
      </form>
    </div>
  );
};
