import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductsListContext } from '../../../context/listOfProducts';
import { ProductIdContext } from '../../../context/productID.context';
import { RoleContext } from '../../../context/role.context';
import { TwitterWalletContext } from '../../../context/twitterWallet';
import { WalletContext } from '../../../context/wallet';
import { DecreaseActivistPointsAfterBuy } from '../../../services/Activist.services';
import {
  getBusinessCompanyName,
  getProductId,
} from '../../../services/Business.services';
import './usersCampaignProducts.css';

export const UsersCampaignProducts = () => {
  const { productsList } = useContext(ProductsListContext);
  const { setProductId } = useContext(ProductIdContext);
  const navigate = useNavigate();
  const { wallet } = useContext(WalletContext);
  const { role } = useContext(RoleContext);
  const { points } = useContext(TwitterWalletContext);
  const { user } = useAuth0();

  // To by Product i need product id to create the right order of product
  const handleBuyProduct = async (CampaignId, productName, unitPrice) => {
    let id = await getProductId(CampaignId, productName);
    let resolvedId = await id;
    setProductId(resolvedId);
    navigate('/buyerForm', {
      state: {
        unitPrice,
      },
    });
  };

  //Activist can buy product with points
  const handleBuyProductWithPoints = async (
    CampaignId,
    productName,
    unitPrice
  ) => {
    let id = await getProductId(CampaignId, productName);
    //product id help me find what company donated the product
    let productId = await id;
    // I need business company name for the tweet about user purchase product with points
    let companyName = await getBusinessCompanyName(productId);
    setProductId(productId);
    console.log(companyName);

    navigate('/purchaseWithPoints', {
      state: {
        unitPrice,
        companyName,
      },
    });
  };

  const handleActivistDonate = async (unitPrice) => {
    let Email = user.email;
    let dropPoints = parseInt(unitPrice);
    // Decrease twitter user point after purchasing a product with points
    await DecreaseActivistPointsAfterBuy(dropPoints, Email);
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
                    className='img'
                    variant='top'
                    src={imageURL}
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                    }}
                  />
                  <Card.Body className='body'>
                    <Card.Title className='title'>{productName}</Card.Title>
                    <Card.Text className='text'>
                      <p>
                        Potential Donation:
                        {(
                          parseFloat(unitPrice) * parseInt(unitsInStock)
                        ).toFixed(2)}
                        $
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
                  className='img'
                  variant='top'
                  src={imageURL}
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                  }}
                />
                <Card.Body className='body'>
                  <Card.Title className='title'>{productName}</Card.Title>
                  <Card.Text className='text'>
                    <p>Product Price: {parseFloat(unitPrice).toFixed(2)}$</p>
                    <p>Units In Stock: {unitsInStock}</p>
                    <p>Campaign ID For Donation: {CampaignId}</p>
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
                  parseInt(unitPrice) <= parseInt(points) ? (
                    <Button
                      className='btn'
                      variant='warning'
                      onClick={() =>
                        handleBuyProductWithPoints(
                          CampaignId,
                          productName,
                          unitPrice
                        )
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
                  parseFloat(unitPrice) <= parseInt(points) ? (
                    <Button
                      className='btn'
                      variant='success'
                      onClick={() => handleActivistDonate(unitPrice)}
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
                  className='img'
                  variant='top'
                  src={imageURL}
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                  }}
                />
                <Card.Body className='body'>
                  <Card.Title className='title'>{productName}</Card.Title>
                  <Card.Text className='text'>
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
