import React from 'react';
import { Button } from 'react-bootstrap';

export const PersonalCampRowDisplay = ({
  name,
  website,
  hashtag,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{website}</td>
      <td>{hashtag}</td>
      <td>
        <Button onClick={handleUpdate} variant='success'>
          Update
        </Button>
      </td>
      <td>
        <Button onClick={handleDelete} variant='danger'>
          Delete
        </Button>
      </td>
    </tr>
  );
};
