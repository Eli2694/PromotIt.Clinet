import React from 'react';
import { Button } from 'react-bootstrap';

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
      <td>
        <a href={AssociationWebsite}>{AssociationWebsite}</a>
      </td>
      <td>{campaignName}</td>
      <td>
        <a href={campaignWebsite}>{campaignWebsite}</a>
      </td>
      <td>{campaginHashtag}</td>
      <td>{parseFloat(donationAmount).toFixed(2)}$</td>
      <td>
        <Button onClick={handleProductsList} variant='light'>
          See Campaign Product
        </Button>
      </td>
    </tr>
  );
};
