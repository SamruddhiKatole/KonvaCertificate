import React from 'react';
import { Typography, Link, Box, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const VariablesTab = ({ variablesList, handleAddText, handleCopy }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Add Variables
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Don’t know,&nbsp;
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert('Explain how to use variables here!');
          }}
        >
          how to use it?
        </Link>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {variablesList.map((variable) => (
          <Box
            key={variable}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
              cursor: 'pointer'
            }}
            onClick={() => handleAddText(variable)}
          >
            <Typography variant="body2" sx={{ color: '#828282' }}>
              {variable}
            </Typography>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(variable);
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default VariablesTab;



