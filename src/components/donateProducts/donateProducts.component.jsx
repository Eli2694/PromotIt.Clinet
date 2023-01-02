import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from '../../context/role.context';
import { Donate } from '../../services/Business.services';
import './donateProducts.css';

export const DonateProducts = () => {
  const [productName, setProductName] = useState('');
  const [unitPrice, setUnitPrice] = useState(1);
  const [unitsInStock, setUnitsInStock] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useContext(RoleContext);
  const { user } = useAuth0();

  const { CampaignId } = location.state ? location.state : { CampaignId: null };

  const handleDonate = async (e) => {
    e.preventDefault();
    let Email = user.email;
    let product = {
      productName,
      unitPrice,
      unitsInStock,
      CampaignId,
      Email,
    };
    await Donate(product);
    navigate('/AllCampaignsForBusiness');
  };

  if (role.find((role) => role.name === 'BusinessRepresentative')) {
    return (
      <div className='donate'>
        <h2>Thank You For Your Donation</h2>
        <form onSubmit={handleDonate}>
          <label>Product Name</label>
          <input
            type='text'
            required
            onChange={(e) => setProductName(e.target.value.replace(/'/g, ''))}
          />
          <label>Product Unit Price In $</label>
          <input
            type='number'
            min={0.1}
            step={0.01}
            required
            onChange={(e) => setUnitPrice(e.target.value)}
          />
          <label>products in stock</label>
          <input
            type='number'
            required
            onChange={(e) => setUnitsInStock(e.target.value)}
          />
          <button>Donate</button>
          <button onClick={() => navigate('/AllCampaignsForBusiness')}>
            Go Back
          </button>
        </form>
      </div>
    );
  }
};
