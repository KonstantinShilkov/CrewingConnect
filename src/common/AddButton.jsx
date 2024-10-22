import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';

const AddButton = props => {
  return (
    <div>
      <Button onClick={props.handleClickOpen}>
        <AddCircleIcon />
      </Button>
    </div>
  );
};

export default AddButton;
