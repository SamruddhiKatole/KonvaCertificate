import React from 'react';
import { Typography, Button } from '@mui/material';

const containedBtnStyle = {
  backgroundColor: '#FA6551',
  color: '#fff',
  '&:hover': { backgroundColor: '#FA6551' }
};

const ImagesTab = ({ handleAddESignature }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Images
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Insert additional images/logos
      </Typography>
      <Button variant="contained" sx={containedBtnStyle} onClick={handleAddESignature}>
        Add E-Signature
      </Button>
    </>
  );
};

export default ImagesTab;



