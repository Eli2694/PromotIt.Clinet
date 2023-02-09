import React from 'react';
import { Button } from 'react-bootstrap';
import './homePageRow.css';

export const HomePageRow = ({
  AssociationName,
  AssociationWebsite,
  campaignName,
  campaginHashtag,
  campaignWebsite,
  donationAmount,
  handleProductsList,
}) => {
  return (
    <tr>
      <td>{AssociationName}</td>
      <td>{AssociationWebsite}</td>
      <td>{campaignName}</td>
      <td>{campaignWebsite}</td>
      <td>{campaginHashtag}</td>
      <td>{parseFloat(donationAmount).toFixed(2)}$</td>
      <td>
        <Button onClick={handleProductsList} variant='light'>
          See Campaign Products
        </Button>
      </td>
    </tr>
  );
};
