import React from 'react';
import s from './Preloader.module.css';
import { CircularProgress } from '@mui/joy';
import { Box } from '@mui/system';

let Preloader = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Preloader;
