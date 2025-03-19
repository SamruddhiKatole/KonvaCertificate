import React from 'react';
import { Typography, Box, TextField } from '@mui/material';

const FontsTab = ({
  handleDragOver,
  handleDrop,
  handleFileChange,
  selectedFont
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Fonts
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Customize fonts (coming soon)
      </Typography>
      <Box
        sx={{
          border: '2px dashed grey',
          borderRadius: '8px',
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          mb: 2,
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          style={{ display: 'none' }}
          id="font-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="font-upload">
          <Typography variant="body2">
            Drag and drop a font file here, or <strong>click</strong> to browse
          </Typography>
        </label>
      </Box>
      {selectedFont && (
        <Typography variant="body2">
          Selected file: {selectedFont.name}
        </Typography>
      )}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Existing Custom Fonts:
      </Typography>
    </>
  );
};

export default FontsTab;
