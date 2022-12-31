import React from 'react';
import { Button } from 'react-bootstrap';

export const BusinessRow = ({
  name,
  website,
  hashtag,
  handleDonate,
  handleDisplay,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        <a href={website}>{website}</a>
      </td>
      <td>{hashtag}</td>
      <td>
        <Button onClick={handleDonate} variant='light'>
          Donate
        </Button>
      </td>
      <td>
        <Button onClick={handleDisplay} variant='info'>
          Campaign Products
        </Button>
      </td>
    </tr>
  );
};
