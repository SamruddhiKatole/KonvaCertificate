import React from 'react';
import { Typography, Box, Button, Card, CardHeader, CardContent, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageThumbnail from './PageThumbnail';
const containedBtnStyle = {
  backgroundColor: '#FA6551',
  color: '#fff',
  '&:hover': { backgroundColor: '#FA6551' }
};
const outlinedBtnStyle = {
  borderColor: '#FA6551',
  color: '#FA6551',
  '&:hover': {
    borderColor: '#FA6551',
    backgroundColor: 'rgba(250,101,81,0.1)'
  }
};

const PagesTab = ({
  certificate,
  currentPageIndex,
  canvasSize,
  addPage,
  removePage,
  anchorEl,
  handleMenuClick,
  handleMenuClose,
  handleMenuAddPage,
  handleMenuRemovePage,
  setCurrentPageIndex
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Selected Page
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Current page seen here
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
        <Button variant="contained" sx={containedBtnStyle} onClick={addPage}>
          Add Page
        </Button>
        <Button
          variant="outlined"
          sx={outlinedBtnStyle}
          onClick={() => removePage(currentPageIndex)}
        >
          Remove Page
        </Button>
      </Box>
      {certificate.pages.map((page, index) => (
        <Card
          key={page.id}
          sx={{
            mb: 2,
            border: index === currentPageIndex ? '2px solid #1976d2' : '1px solid #ccc',
            cursor: 'pointer'
          }}
          onClick={() => setCurrentPageIndex(index)}
        >
          <CardHeader
            title={`Page No.${index + 1}`}
            action={
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClick(e, index);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Box sx={{ width: 200, height: 140 }}>
              <PageThumbnail page={page} canvasSize={canvasSize} />
            </Box>
          </CardContent>
        </Card>
      ))}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuAddPage}>Add Page</MenuItem>
        <MenuItem onClick={handleMenuRemovePage}>Remove Page</MenuItem>
      </Menu>
    </>
  );
};

export default PagesTab;




