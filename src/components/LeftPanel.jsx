import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Link,
  FormControl,
  Select,
  InputLabel,
  TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PagesIcon from '@mui/icons-material/Description';
import TemplateIcon from '@mui/icons-material/Palette';
import VariableIcon from '@mui/icons-material/Pin';
import BackgroundIcon from '@mui/icons-material/Wallpaper';
import ImageIcon from '@mui/icons-material/Image';
import TextIcon from '@mui/icons-material/TextFields';
import FontIcon from '@mui/icons-material/FontDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import PageThumbnail from './PageThumbnail';
import TemplateSelector from './TemplateSelector';
import { containedBtnStyle } from '../utils/constants';

const LeftPanel = (props) => {
  const {
    activeTab,
    setActiveTab,
    certificate,
    currentPageIndex,
    canvasSize,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleMenuAddPage,
    handleMenuRemovePage,
    variablesList,
    handleAddText,
    handleCopy,
    handleTemplateSelect,
    handleDragOver,
    handleDrop,
    selectedFont,
    handleFileChange,
    handleAddESignature,
    handleAddStyledText
  } = props;

  const renderContent = () => {
    if (activeTab === 'pages') {
      return (
        <>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Selected Page
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Current page seen here
          </Typography>
          {certificate.pages.map((page, index) => (
            <Card
              key={page.id}
              sx={{
                mb: 2,
                border: index === currentPageIndex ? '2px solid #1976d2' : '1px solid #ccc',
                cursor: 'pointer'
              }}
              onClick={() => props.setCurrentPageIndex(index)}
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
                    <span>⋮</span>
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
    }
    if (activeTab === 'templates') {
      return <TemplateSelector onSelectTemplate={handleTemplateSelect} />;
    }
    if (activeTab === 'variables') {
      return (
        <>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Add Variables
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Don’t know,{' '}
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
    }
    if (activeTab === 'background') {
      return (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Background
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Set a background color or image
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              variant="contained"
              sx={containedBtnStyle}
              onClick={() => {
                let updatedPages = [...certificate.pages];
                updatedPages[currentPageIndex].backgroundColor = '#f0f0f0';
                props.setCertificate({ ...certificate, pages: updatedPages });
              }}
            >
              Light Gray
            </Button>
            <Button
              variant="contained"
              sx={containedBtnStyle}
              onClick={() => {
                let updatedPages = [...certificate.pages];
                updatedPages[currentPageIndex].backgroundImage =
                  'https://via.placeholder.com/1123x794?text=Custom+BG';
                props.setCertificate({ ...certificate, pages: updatedPages });
              }}
            >
              Placeholder Image
            </Button>
          </Box>
        </>
      );
    }
    if (activeTab === 'images') {
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
    }
    if (activeTab === 'fonts') {
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
              mb: 2
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
    }
    if (activeTab === 'text') {
      return (
        <Box sx={{ p: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Add Text
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            You can add text and modify it as per your requirement
          </Typography>
          <Typography variant="h4" sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleAddStyledText('Header 1', 32)}>
            Header 1
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleAddStyledText('Header 2', 28)}>
            Header 2
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleAddStyledText('Header 3', 24)}>
            Header 3
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleAddStyledText('Header 4', 20)}>
            Header 4
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleAddStyledText('Header 5', 18)}>
            Header 5
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleAddStyledText('Body Font 1', 16)}>
            Body Font 1
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleAddStyledText('Caption', 12)}>
            Caption
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
  {/* Left Sidebar */}
  <Box
    sx={{
      width: 119,
      bgcolor: '#273142',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 2,
      pb: 2,
    }}
  >
        <IconButton sx={{ color: '#fff', mb: 3 }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('pages')}>
            <PagesIcon />
            <Typography variant="caption">Pages</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('templates')}>
            <TemplateIcon />
            <Typography variant="caption">Templates</Typography>
            {/* <TemplateSelector onSelectTemplate={handleTemplateSelect} /> */}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('variables')}>
            <VariableIcon />
            <Typography variant="caption">Variables</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('background')}>
            <BackgroundIcon />
            <Typography variant="caption">Background</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('images')}>
            <ImageIcon />
            <Typography variant="caption">Images</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('text')}>
            <TextIcon />
            <Typography variant="caption">Text</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('fonts')}>
            <FontIcon />
            <Typography variant="caption">Fonts</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 'auto', textAlign: 'center' }}>
          <Divider sx={{ mb: 1, bgcolor: '#4a4a4a' }} />
          <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
            Powered by
          </Typography>
          <Box
            component="img"
            src="https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/websiteimages/ts+logo+hat+in+top-01.svg"
            sx={{ width: '80%', mt: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#ffffff', overflowY: 'auto' }}>
    {renderContent()}
  </Box>
    </Box>
  );
};

export default LeftPanel;

