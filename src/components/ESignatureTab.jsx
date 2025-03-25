import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const placementOptions = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'center-left', label: 'Center Left' },
  { value: 'center', label: 'Center' },
  { value: 'center-right', label: 'Center Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
];

const ESignatureTab = ({ canvasSize, updateESignature }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [generatedName, setGeneratedName] = useState('');
  const [placement, setPlacement] = useState('bottom-right');

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const calculatePosition = (placement, canvasSize, signatureWidth = 150, signatureHeight = 50) => {
    let x = 0, y = 0;
    switch (placement) {
      case 'top-left':
        x = 20;
        y = 20;
        break;
      case 'top-center':
        x = (canvasSize.width - signatureWidth) / 2;
        y = 20;
        break;
      case 'top-right':
        x = canvasSize.width - signatureWidth - 20;
        y = 20;
        break;
      case 'center-left':
        x = 20;
        y = (canvasSize.height - signatureHeight) / 2;
        break;
      case 'center':
        x = (canvasSize.width - signatureWidth) / 2;
        y = (canvasSize.height - signatureHeight) / 2;
        break;
      case 'center-right':
        x = canvasSize.width - signatureWidth - 20;
        y = (canvasSize.height - signatureHeight) / 2;
        break;
      case 'bottom-left':
        x = 20;
        y = canvasSize.height - signatureHeight - 20;
        break;
      case 'bottom-center':
        x = (canvasSize.width - signatureWidth) / 2;
        y = canvasSize.height - signatureHeight - 20;
        break;
      case 'bottom-right':
      default:
        x = canvasSize.width - signatureWidth - 20;
        y = canvasSize.height - signatureHeight - 20;
        break;
    }
    return { x, y };
  };

  const applySignature = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        const pos = calculatePosition(placement, canvasSize);
        updateESignature({ type: 'image', src: dataUrl, ...pos });
      };
      reader.readAsDataURL(selectedFile);
    } else if (generatedName) {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.font = '30px cursive';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(generatedName, canvas.width / 2, canvas.height / 2);
      const dataUrl = canvas.toDataURL();
      const pos = calculatePosition(placement, canvasSize, 150, 50);
      updateESignature({ type: 'generated', src: dataUrl, ...pos });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        E-Signature Options
      </Typography>
      <Typography variant="body2">
        Upload a signature image or generate one from your name.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Box>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="esignature-upload"
            onChange={handleFileUpload}
          />
          <label htmlFor="esignature-upload">
            <Button variant="outlined" component="span">
              Upload Signature Image
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {selectedFile.name}
            </Typography>
          )}
        </Box>

        <Divider />

        <TextField
          label="Generate Signature from Name"
          variant="outlined"
          value={generatedName}
          onChange={(e) => setGeneratedName(e.target.value)}
        />

        <FormControl variant="outlined">
          <InputLabel id="signature-placement-label">Placement</InputLabel>
          <Select
            labelId="signature-placement-label"
            label="Placement"
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
          >
            {placementOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={applySignature}>
          Apply E-Signature
        </Button>
      </Box>
    </Box>
  );
};

export default ESignatureTab;











