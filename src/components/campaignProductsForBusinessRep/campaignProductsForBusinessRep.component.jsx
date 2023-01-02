import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductIdContext } from '../../context/productID.context';
import { RoleContext } from '../../context/role.context';
import {
  delProduct,
  getCampaignProducts,
  getProductId,
} from '../../services/Business.services';
import './campaignProductsForBusinessRep.css';

export const CampaignProductsForBusinessRep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useContext(RoleContext);
  const [listOfProducts, setListOfProducts] = useState([]);
  const { setProductId } = useContext(ProductIdContext);
  const { user } = useAuth0();

  const { CampaignId } = location.state ? location.state : { CampaignId: null };

  const CampaignProducts = async () => {
    let Email = user.email;
    let cProducts = await getCampaignProducts(CampaignId, Email);
    setListOfProducts(cProducts);
  };

  useEffect(() => {
    CampaignProducts();
  }, []);

  const handleProductUpdate = (
    CampaignId,
    productName,
    unitPrice,
    unitsInStock
  ) => {
    productIdFromDB(CampaignId, productName);
    let productInfo = {
      productName,
      unitPrice,
      unitsInStock,
      CampaignId,
    };
    navigate('/updateProduct', {
      state: {
        productInfo,
      },
    });
  };

  const productIdFromDB = async (CampaignId, productName) => {
    let id = await getProductId(CampaignId, productName);
    console.log(id);
    setProductId(id);
  };

  const handleProductDelete = async (CampaignId, productName) => {
    await delProduct(CampaignId, productName);
    await CampaignProducts();
  };

  if (role.find((role) => role.name === 'BusinessRepresentative')) {
    return (
      <div className='card-list'>
        {listOfProducts &&
          listOfProducts.map((product) => {
            let { productName, unitPrice, unitsInStock, CampaignId } = product;
            return (
              <Card className='card'>
                <Card.Body>
                  <Card.Title>{productName}</Card.Title>
                  <Card.Text>
                    <h6>Product Price {parseFloat(unitPrice).toFixed(2)}$</h6>
                    <h6>Units In Stock {unitsInStock}</h6>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    className='btn'
                    variant='success'
                    onClick={() =>
                      handleProductUpdate(
                        CampaignId,
                        productName,
                        unitPrice,
                        unitsInStock
                      )
                    }
                  >
                    Update
                  </Button>
                  <Button
                    className='btn'
                    variant='danger'
                    onClick={() => handleProductDelete(CampaignId, productName)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
      </div>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
