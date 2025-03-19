import React, { useState } from 'react';
import templatesData from '../templates.json';
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';

function TemplateSelector({ onSelectTemplate }) {
  // Optional: track selected format
  const [selectedFormat, setSelectedFormat] = useState('A4 Landscape');

  return (
    <Box sx={{ px: 1, py: 2 }}>
      {/* Title & Subtitle */}
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Select Template
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Use our any ready-made template & edit as you want
      </Typography>

      {/* Optional: Format Dropdown */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="format-select-label">Format</InputLabel>
        <Select
          labelId="format-select-label"
          id="format-select"
          value={selectedFormat}
          label="Format"
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          <MenuItem value="A4 Landscape">A4 Landscape</MenuItem>
          <MenuItem value="A4 Portrait">A4 Portrait</MenuItem>
        </Select>
      </FormControl>

      {/* Templates List */}
      {templatesData.map((template) => (
        <Box
          key={template._id.$oid}
          onClick={() => onSelectTemplate(template)}
          sx={{
            mb: 2,
            // border: '1px solid #ccc',
            // borderRadius: 1,
            overflow: 'hidden',
            cursor: 'pointer',
            // boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <img
            src={template.imgUrl}
            alt={template.templateName}
            style={{
              width: '70%',
              display: 'block',
              paddingLeft: '50px',
              paddingRight: '50px'
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default TemplateSelector;





