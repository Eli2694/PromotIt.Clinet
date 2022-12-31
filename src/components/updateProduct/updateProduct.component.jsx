import React, { useContext, useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from '../../context/role.context';
import { getProductId, UpdProduct } from '../../services/Business.services';
import './updateProduct.css';

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useContext(RoleContext);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [productId, setProductId] = useState();

  const { CampaignId, productName, productInfo } = location.state
    ? location.state
    : { productInfo: null, CampaignId: null, productName: null };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let pUpdate = {
      name,
      price,
      stock,
      productId,
    };
    await UpdProduct(pUpdate);
    navigate('/BusinessRepProducts');
  };

  const productIdFromDB = async () => {
    let id = await getProductId(CampaignId, productName);
    setProductId(id);
  };

  useEffect(() => {
    productIdFromDB();
  }, []);

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
              onChange={(e) => setName(e.target.value.replace(/'/g, ''))}
            />
            <label>Unit Price</label>
            <input
              type='text'
              required
              onChange={(e) => setPrice(e.target.value.replace(/'/g, ''))}
            />
            <label>Units In Stock</label>
            <input
              type='text'
              required
              onChange={(e) => setStock(e.target.value.replace(/'/g, ''))}
            />
            <button>Update</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </form>
        </div>
      </>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
