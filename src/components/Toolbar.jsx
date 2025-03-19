import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { containedBtnStyle, outlinedBtnStyle } from '../utils/constants';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SaveIcon from '@mui/icons-material/Save';

const Toolbar = ({
  zoom,
  setZoom,
  undo,
  redo,
  downloadCertificate,
  downloadCertificateAsPDF,
  downloadCanvasAsHTML,
  navigateHome,
  textSettings,
  handleToolbarChange,
  handleToggle,
  handleSaveToolbar
}) => {
  return (
    <Box sx={{ backgroundColor: '#fff', border: '10px solid #fff', padding: 2, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
      <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => setZoom(zoom / 1.2)}>
        Zoom Out
      </Button>
      <Typography sx={{ alignSelf: 'center' }}>
        {Math.round(zoom * 100)}%
      </Typography>
      <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => setZoom(zoom * 1.2)}>
        Zoom In
      </Button>
      <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => setZoom(1)}>
        Reset
      </Button>
      <Button variant="outlined" sx={outlinedBtnStyle} onClick={undo}>
        Undo
      </Button>
      <Button variant="outlined" sx={outlinedBtnStyle} onClick={redo}>
        Redo
      </Button>
      <Button variant="contained" sx={containedBtnStyle} onClick={downloadCertificate}>
        Download PNG
      </Button>
      <Button variant="contained" sx={containedBtnStyle} onClick={downloadCertificateAsPDF}>
        Download PDF
      </Button>
      <Button variant="contained" sx={containedBtnStyle} onClick={downloadCanvasAsHTML}>
        Download HTML
      </Button>
      <Button variant="outlined" sx={outlinedBtnStyle} onClick={navigateHome}>
        Home
      </Button>
      {/* Render text editing controls if active */}
      { textSettings.show && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        <FormControl size="small">
          <InputLabel>Font</InputLabel>
          <Select value={textSettings.fontFamily} label="Font" onChange={(e) => handleToolbarChange('fontFamily', e.target.value)}>
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Size"
          type="number"
          size="small"
          sx={{ width: 80 }}
          value={textSettings.fontSize}
          onChange={(e) => handleToolbarChange('fontSize', parseInt(e.target.value) || 1)}
        />
        <IconButton onClick={() => handleToggle('isBold')} color={textSettings.isBold ? 'primary' : 'default'}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={() => handleToggle('isItalic')} color={textSettings.isItalic ? 'primary' : 'default'}>
          <FormatItalicIcon />
        </IconButton>
        <IconButton onClick={() => handleToggle('isUnderline')} color={textSettings.isUnderline ? 'primary' : 'default'}>
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton onClick={() => handleToolbarChange('align', 'left')} color={textSettings.align === 'left' ? 'primary' : 'default'}>
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton onClick={() => handleToolbarChange('align', 'center')} color={textSettings.align === 'center' ? 'primary' : 'default'}>
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton onClick={() => handleToolbarChange('align', 'right')} color={textSettings.align === 'right' ? 'primary' : 'default'}>
          <FormatAlignRightIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ColorLensIcon />
          <TextField
            type="color"
            size="small"
            value={textSettings.color}
            onChange={(e) => handleToolbarChange('color', e.target.value)}
            sx={{ width: 50 }}
          />
        </Box>
        <TextField
          label="Text"
          size="small"
          value={textSettings.text}
          onChange={(e) => handleToolbarChange('text', e.target.value)}
        />
        <Button variant="contained" startIcon={<SaveIcon />} sx={{ backgroundColor: '#FA6551' }} onClick={handleSaveToolbar}>
          Save
        </Button>
      </Box>
      )}
    </Box>
  );
};

export default Toolbar;

