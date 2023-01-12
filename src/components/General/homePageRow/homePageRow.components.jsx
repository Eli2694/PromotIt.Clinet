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
      <td>
        <a href={AssociationWebsite} target='_blank' className='web-link'>
          {AssociationWebsite}
        </a>
      </td>
      <td>{campaignName}</td>
      <td>
        <a href={campaignWebsite} target='_blank' className='web-link'>
          {campaignWebsite}
        </a>
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
