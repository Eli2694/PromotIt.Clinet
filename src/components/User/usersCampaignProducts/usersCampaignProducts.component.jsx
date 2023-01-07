import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductsListContext } from '../../../context/listOfProducts';
import { ProductIdContext } from '../../../context/productID.context';
import { RoleContext } from '../../../context/role.context';
import { TwitterWalletContext } from '../../../context/twitterWallet';
import { WalletContext } from '../../../context/wallet';
import { getProductId } from '../../../services/Business.services';

export const UsersCampaignProducts = () => {
  const { productsList } = useContext(ProductsListContext);
  const { setProductId } = useContext(ProductIdContext);
  const navigate = useNavigate();
  const { wallet } = useContext(WalletContext);
  const { role } = useContext(RoleContext);
  const { points } = useContext(TwitterWalletContext);

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

  if (role.find((role) => role.name === 'NonProfitRepresentative')) {
    return (
      <>
        <div className='card-list'>
          {productsList &&
            productsList.map((product) => {
              let {
                productName,
                unitPrice,
                unitsInStock,
                CampaignId,
                imageURL,
              } = product;
              return (
                <Card className='card'>
                  <Card.Img
                    variant='top'
                    src={imageURL}
                    style={{
                      maxWidth: '200px',
                      maxHeight: '250px',
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{productName}</Card.Title>
                    <Card.Text>
                      <p>
                        Potential Donation:{' '}
                        {parseFloat(unitPrice) * parseInt(unitsInStock)}$
                      </p>
                      <p>Product Price: {parseFloat(unitPrice).toFixed(2)}$</p>
                      <p>Units In Stock: {unitsInStock}</p>
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
      </>
    );
  } else if (role.find((role) => role.name === 'SocialActivist')) {
    return (
      <div className='card-list'>
        {productsList &&
          productsList.map((product) => {
            let { productName, unitPrice, unitsInStock, CampaignId, imageURL } =
              product;
            return (
              <Card className='card'>
                <Card.Img
                  variant='top'
                  src={imageURL}
                  style={{
                    maxWidth: '200px',
                    maxHeight: '300px',
                  }}
                />
                <Card.Body>
                  <Card.Title>{productName}</Card.Title>
                  <Card.Text>
                    <p>Product Price: {parseFloat(unitPrice).toFixed(2)}$</p>
                    <p>Units In Stock: {unitsInStock}</p>
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

                  {unitsInStock > 0 &&
                  parseFloat(unitPrice) <= parseFloat(points) ? (
                    <Button
                      className='btn'
                      variant='Secondary'
                      onClick={() =>
                        handleBuyProduct(CampaignId, productName, unitPrice)
                      }
                    >
                      Buy With Points
                    </Button>
                  ) : (
                    <Button className='btn' variant='Secondary' disabled>
                      Buy With Points
                    </Button>
                  )}

                  {unitsInStock > 0 &&
                  parseFloat(unitPrice) <= parseFloat(points) ? (
                    <Button
                      className='btn'
                      variant='success'
                      onClick={() =>
                        handleBuyProduct(CampaignId, productName, unitPrice)
                      }
                    >
                      Donate
                    </Button>
                  ) : (
                    <Button className='btn' variant='success' disabled>
                      Donate
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            );
          })}
      </div>
    );
  } else {
    return (
      <div className='card-list'>
        {productsList &&
          productsList.map((product) => {
            let { productName, unitPrice, unitsInStock, CampaignId, imageURL } =
              product;

            return (
              <Card className='card'>
                <Card.Img
                  variant='top'
                  src={imageURL}
                  style={{
                    maxWidth: '200px',
                    maxHeight: '250px',
                  }}
                />
                <Card.Body>
                  <Card.Title>{productName}</Card.Title>
                  <Card.Text>
                    <p>Product Price: {parseFloat(unitPrice).toFixed(2)}$</p>
                    <p>Units In Stock: {unitsInStock}</p>
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
  }
};
