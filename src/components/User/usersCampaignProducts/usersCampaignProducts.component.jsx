import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductsListContext } from '../../../context/listOfProducts';
import { ProductIdContext } from '../../../context/productID.context';
import { WalletContext } from '../../../context/wallet';
import { getProductId } from '../../../services/Business.services';

export const UsersCampaignProducts = () => {
  const { productsList } = useContext(ProductsListContext);
  const { setProductId } = useContext(ProductIdContext);
  const navigate = useNavigate();
  const { wallet } = useContext(WalletContext);

  const handleBuyProduct = async (CampaignId, productName, unitPrice) => {
    try {
      let id = await getProductId(CampaignId, productName);
      let resolvedId = await id;
      console.log(resolvedId);
      setProductId(resolvedId);
      navigate('/buyerForm', {
        state: {
          unitPrice,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='card-list'>
      {productsList &&
        productsList.map((product) => {
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
                {unitsInStock > 0 &&
                parseFloat(unitPrice) <= parseFloat(wallet) ? (
                  <Button
                    className='btn'
                    variant='primary'
                    onClick={() =>
                      handleBuyProduct(CampaignId, productName, unitPrice)
                    }
                  >
                    Buy
                  </Button>
                ) : (
                  <Button className='btn' variant='primary' disabled>
                    Buy
                  </Button>
                )}
              </Card.Footer>
            </Card>
          );
        })}
    </div>
  );
};
