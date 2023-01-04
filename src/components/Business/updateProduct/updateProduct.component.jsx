import React, { useContext, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductIdContext } from '../../../context/productID.context';
import { RoleContext } from '../../../context/role.context';
import { UpdProduct } from '../../../services/Business.services';
import './updateProduct.css';

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useContext(RoleContext);
  const [productName, setProductName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unitsInStock, setUnitsInStock] = useState('');
  const { productId } = useContext(ProductIdContext);

  const { productInfo } = location.state
    ? location.state
    : { productInfo: null };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let pUpdate = {
      productName,
      unitPrice,
      unitsInStock,
      productId,
    };
    await UpdProduct(pUpdate);
    navigate('/AllCampaignsForBusiness');
  };

  if (role.find((role) => role.name === 'BusinessRepresentative')) {
    return (
      <>
        <div className='product-info'>
          {' '}
          <Card bg='info' style={{ width: '18rem' }}>
            <Card.Header>Product</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                Product Name: {productInfo.productName}
              </ListGroup.Item>
              <ListGroup.Item>
                Unit Price: {parseFloat(productInfo.unitPrice).toFixed(2)}$
              </ListGroup.Item>
              <ListGroup.Item>
                Units In Stock: {productInfo.unitsInStock}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <div className='productUpdate'>
          <h2>Update Product</h2>
          <form onSubmit={handleUpdate}>
            <label>Product Name</label>
            <input
              type='text'
              required
              onChange={(e) => setProductName(e.target.value.replace(/'/g, ''))}
            />
            <label>Unit Price</label>
            <input
              type='text'
              required
              onChange={(e) => setUnitPrice(e.target.value.replace(/'/g, ''))}
            />
            <label>Units In Stock</label>
            <input
              type='text'
              required
              onChange={(e) =>
                setUnitsInStock(e.target.value.replace(/'/g, ''))
              }
            />
            <button>Update</button>
            <button onClick={() => navigate('/AllCampaignsForBusiness')}>
              Go Back
            </button>
          </form>
        </div>
      </>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
