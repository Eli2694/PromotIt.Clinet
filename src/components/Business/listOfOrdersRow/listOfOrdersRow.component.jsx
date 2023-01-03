import React from 'react';
import { Button } from 'react-bootstrap';

export const ListOfOrdersRow = ({
  country,
  city,
  address,
  postalCode,
  phoneNumber,
  productName,
  price,
  stock,
  date,
  handleConfirm,
}) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{country}</td>
      <td>{city}</td>
      <td>{address}</td>
      <td>{postalCode}</td>
      <td>{phoneNumber}</td>
      <td>{productName}</td>
      <td>{parseFloat(price).toFixed(2)}$</td>
      <td>{stock}</td>
      <td>
        <Button onClick={handleConfirm} variant='success'>
          Confirm
        </Button>
      </td>
    </tr>
  );
};
