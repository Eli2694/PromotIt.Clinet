import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from '../../context/role.context';
import {
  delProduct,
  getCampaignProducts,
} from '../../services/Business.services';
import './campaignProductsForBusinessRep.css';

export const CampaignProductsForBusinessRep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useContext(RoleContext);
  const [listOfProducts, setListOfProducts] = useState([]);

  const { CampaignId } = location.state ? location.state : { CampaignId: null };

  const CampaignProducts = async () => {
    console.log(CampaignId);
    let cProducts = await getCampaignProducts(CampaignId);
    console.log(cProducts);
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
