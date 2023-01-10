import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductIdContext } from '../../../context/productID.context';
import { TwitterWalletContext } from '../../../context/twitterWallet';
import {
  DecreaseActivistPointsAfterBuy,
  sendTwitterMessage,
} from '../../../services/Activist.services';

import {
  decreaseUnitsInStockByOne,
  getUserID,
  postOrderInfo,
} from '../../../services/Users.services';

export const PurchaseWithPoints = () => {
  const { points, setPoints } = useContext(TwitterWalletContext);
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [homeAddress, setHomeAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const { productId } = useContext(ProductIdContext);
  const location = useLocation();

  const { unitPrice, companyName } = location.state
    ? location.state
    : { unitPrice: null, companyName: null };

  const ReceiveUserId = async () => {
    let id = getUserID(user.email);
    let resolvedId = await id;
    setUserId(resolvedId);
  };

  const handlePurchaseByPoints = async (e) => {
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
    //let campaignID = await getCampaignID(productId);
    await postOrderInfo(order);
    await decreaseUnitsInStockByOne(productId);

    let UserPointsAfterPurchase = parseInt(points) - parseInt(unitPrice);
    let Email = user.email;
    let dropPoints = parseInt(unitPrice);
    await DecreaseActivistPointsAfterBuy(dropPoints, Email);
    await sendTwitterMessage(username, companyName);
    setPoints(UserPointsAfterPurchase);
    navigate('/');
  };

  useEffect(() => {
    ReceiveUserId();
  }, []);

  return (
    <div className='purchase'>
      <h2>Buyer Details</h2>
      <form onSubmit={handlePurchaseByPoints}>
        <label>Twitter Username</label>
        <input
          type='text'
          required
          placeholder='Twitter username without @'
          onChange={(e) => setUsername(e.target.value.replace(/'/g, ''))}
        />
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
