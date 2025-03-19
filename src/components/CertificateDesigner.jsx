// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import { jsPDF } from 'jspdf';
// import LeftSidebar from './LeftSidebar';
// import CanvasArea from './CanvasArea';
// import Toolbar from './Toolbar';
// import { generateHTMLForCertificate } from '../utils/certificateUtils';

// const containedBtnStyle = {
//   backgroundColor: '#FA6551',
//   color: '#fff',
//   '&:hover': { backgroundColor: '#FA6551' }
// };

// const CertificateDesigner = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   // Initial certificate state – you can expand this as needed.
//   const [certificate, setCertificate] = useState({
//     id: id || Date.now().toString(),
//     pages: [
//       {
//         id: 1,
//         texts: [],
//         shapes: [],
//         backgroundColor: '#ffffff',
//         backgroundImage: null,
//         eSignature: null
//       }
//     ]
//   });

//   const [currentPageIndex, setCurrentPageIndex] = useState(0);
//   const [canvasSize, setCanvasSize] = useState({ width: 1123, height: 794 });
//   const [zoom, setZoom] = useState(1);
//   const [history, setHistory] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);
//   const [activeTab, setActiveTab] = useState('pages');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedPageIndex, setSelectedPageIndex] = useState(null);
//   const [textSettings, setTextSettings] = useState({
//     text: '',
//     fontSize: 24,
//     fontFamily: 'Arial',
//     color: '#000000',
//     isBold: false,
//     isItalic: false,
//     isUnderline: false,
//     align: 'left'
//   });
//   const [activeTextId, setActiveTextId] = useState(null);
//   const [selectedFont, setSelectedFont] = useState(null);

//   // A sample variables list (expand with your own variables)
//   const variablesList = ['Name', 'Date', 'Certificate No'];

//   const stageRef = useRef(null);

//   // Load certificate from localStorage if available
//   useEffect(() => {
//     const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
//     const found = savedCertificates.find((cert) => cert.id === id);
//     if (found) setCertificate(found);
//   }, [id]);

//   // Save certificate to localStorage on changes
//   useEffect(() => {
//     const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
//     const otherCerts = savedCertificates.filter((cert) => cert.id !== certificate.id);
//     localStorage.setItem('certificates', JSON.stringify([...otherCerts, certificate]));
//   }, [certificate]);

//   // History management functions
//   const pushHistory = () => {
//     setHistory([...history, certificate]);
//     setRedoStack([]);
//   };

//   const undo = () => {
//     if (history.length === 0) return;
//     const previous = history[history.length - 1];
//     setRedoStack([certificate, ...redoStack]);
//     setHistory(history.slice(0, history.length - 1));
//     setCertificate(previous);
//   };

//   const redo = () => {
//     if (redoStack.length === 0) return;
//     const next = redoStack[0];
//     setHistory([...history, certificate]);
//     setRedoStack(redoStack.slice(1));
//     setCertificate(next);
//   };

//   // Page operations
//   const addPage = () => {
//     pushHistory();
//     const newPage = {
//       id: certificate.pages.length + 1,
//       texts: [],
//       shapes: [],
//       backgroundColor: '#ffffff',
//       backgroundImage: null,
//       eSignature: null
//     };
//     setCertificate({ ...certificate, pages: [...certificate.pages, newPage] });
//     setCurrentPageIndex(certificate.pages.length);
//   };

//   const removePage = (pageIndex) => {
//     if (certificate.pages.length === 1) return;
//     pushHistory();
//     const updatedPages = certificate.pages.filter((_, idx) => idx !== pageIndex);
//     setCertificate({ ...certificate, pages: updatedPages });
//     setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
//   };

//   const handleMenuClick = (event, index) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedPageIndex(index);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedPageIndex(null);
//   };

//   const handleMenuAddPage = () => {
//     addPage();
//     handleMenuClose();
//   };

//   const handleMenuRemovePage = () => {
//     if (selectedPageIndex !== null) removePage(selectedPageIndex);
//     handleMenuClose();
//   };

//   // Text operations
//   const handleAddText = (textLabel = 'New Text', fontSize = 24) => {
//     pushHistory();
//     const newText = {
//       id: `text-${Date.now()}`,
//       text: textLabel,
//       fontSize,
//       fontFamily: 'Arial',
//       x: 50,
//       y: 50,
//       color: '#000000',
//       type: 'text'
//     };
//     const updatedPages = [...certificate.pages];
//     updatedPages[currentPageIndex].texts.push(newText);
//     setCertificate({ ...certificate, pages: updatedPages });
//   };

//   const updateText = (id, newAttrs) => {
//     pushHistory();
//     const updatedPages = certificate.pages.map((page, idx) => {
//       if (idx === currentPageIndex) {
//         return {
//           ...page,
//           texts: page.texts.map((t) => (t.id === id ? { ...t, ...newAttrs } : t))
//         };
//       }
//       return page;
//     });
//     setCertificate({ ...certificate, pages: updatedPages });
//   };

//   const updateShape = (id, newAttrs) => {
//     pushHistory();
//     const updatedPages = certificate.pages.map((page, idx) => {
//       if (idx === currentPageIndex) {
//         return {
//           ...page,
//           shapes: page.shapes.map((s) => (s.id === id ? { ...s, ...newAttrs } : s))
//         };
//       }
//       return page;
//     });
//     setCertificate({ ...certificate, pages: updatedPages });
//   };

//   // Download functions
//   const downloadCertificate = async () => {
//     setZoom(1);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     for (let i = 0; i < certificate.pages.length; i++) {
//       setCurrentPageIndex(i);
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       if (stageRef.current) {
//         const dataURL = stageRef.current.toDataURL();
//         const link = document.createElement('a');
//         link.href = dataURL;
//         link.download = `certificate-${certificate.id}-page-${i + 1}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       }
//     }
//   };

//   const downloadCertificateAsPDF = async () => {
//     setZoom(1);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     const pdf = new jsPDF({
//       orientation: 'landscape',
//       unit: 'pt',
//       format: [canvasSize.width, canvasSize.height]
//     });
//     for (let i = 0; i < certificate.pages.length; i++) {
//       setCurrentPageIndex(i);
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       if (stageRef.current) {
//         const dataURL = stageRef.current.toDataURL();
//         if (i > 0) pdf.addPage();
//         pdf.addImage(dataURL, 'PNG', 0, 0, canvasSize.width, canvasSize.height);
//       }
//     }
//     pdf.save(`certificate-${certificate.id}.pdf`);
//   };

//   const downloadCanvasAsHTML = () => {
//     const htmlContent = generateHTMLForCertificate(certificate, canvasSize);
//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `certificate-${certificate.id}.html`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Inline text editing on double-click
//   const handleTextDblClick = (e, txt) => {
//     const stage = e.target.getStage();
//     const container = stage.container();
//     const textarea = document.createElement('textarea');
//     container.appendChild(textarea);
//     textarea.value = txt.text;
//     textarea.style.position = 'absolute';
//     textarea.style.top = `${e.evt.clientY}px`;
//     textarea.style.left = `${e.evt.clientX}px`;
//     textarea.style.fontSize = `${txt.fontSize}px`;
//     textarea.style.fontFamily = txt.fontFamily;
//     textarea.style.color = txt.color;
//     textarea.addEventListener('pointerdown', (ev) => ev.stopPropagation());
//     const removeTextarea = () => {
//       updateText(txt.id, { text: textarea.value });
//       container.removeChild(textarea);
//       window.removeEventListener('pointerdown', removeTextarea);
//     };
//     window.addEventListener('pointerdown', removeTextarea);
//     textarea.focus();
//     setActiveTextId(txt.id);
//     setTextSettings({
//       text: txt.text,
//       fontSize: txt.fontSize,
//       fontFamily: txt.fontFamily,
//       color: txt.color,
//       isBold: (txt.fontStyle && txt.fontStyle.includes('bold')) || false,
//       isItalic: (txt.fontStyle && txt.fontStyle.includes('italic')) || false,
//       isUnderline: (txt.textDecoration && txt.textDecoration.includes('underline')) || false,
//       align: txt.align || 'left'
//     });
//   };

//   // Save toolbar settings to update text element
//   const handleSaveToolbar = () => {
//     if (!activeTextId) return;
//     let fontStyle = '';
//     if (textSettings.isBold && textSettings.isItalic) {
//       fontStyle = 'bold italic';
//     } else if (textSettings.isBold) {
//       fontStyle = 'bold';
//     } else if (textSettings.isItalic) {
//       fontStyle = 'italic';
//     }
//     const textDecoration = textSettings.isUnderline ? 'underline' : '';
//     updateText(activeTextId, {
//       text: textSettings.text,
//       fontSize: textSettings.fontSize,
//       fontFamily: textSettings.fontFamily,
//       color: textSettings.color,
//       fontStyle,
//       textDecoration,
//       align: textSettings.align
//     });
//     setActiveTextId(null);
//   };

//   // Font file handling
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFont(e.target.files[0]);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       setSelectedFont(e.dataTransfer.files[0]);
//     }
//   };

//   // Handle Delete/Backspace key to remove last element (example)
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Delete' || e.key === 'Backspace') {
//         const pg = certificate.pages[currentPageIndex];
//         if (pg.texts.length > 0) {
//           updateText(pg.texts[pg.texts.length - 1].id, { text: '' });
//         } else if (pg.shapes.length > 0) {
//           updateShape(pg.shapes[pg.shapes.length - 1].id, {});
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [certificate, currentPageIndex]);

//   // Auto-download if URL has ?download
//   useEffect(() => {
//     if (searchParams.get('download')) {
//       setTimeout(() => {
//         downloadCertificate();
//       }, 500);
//     }
//   }, [searchParams]);

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <LeftSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         certificate={certificate}
//         currentPageIndex={currentPageIndex}
//         canvasSize={canvasSize}
//         anchorEl={anchorEl}
//         handleMenuClick={handleMenuClick}
//         handleMenuClose={handleMenuClose}
//         handleMenuAddPage={handleMenuAddPage}
//         handleMenuRemovePage={handleMenuRemovePage}
//         variablesList={variablesList}
//         handleAddText={handleAddText}
//         handleCopy={(text) => {
//           navigator.clipboard.writeText(text);
//           alert(`${text} copied to clipboard!`);
//         }}
//         handleDragOver={handleDragOver}
//         handleDrop={handleDrop}
//         selectedFont={selectedFont}
//         handleFileChange={handleFileChange}
//         setCurrentPageIndex={setCurrentPageIndex}
//       />
//       <Box sx={{ width: '77%', p: 2, overflowY: 'auto' }}>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
//           <Button variant="outlined" sx={{ ...containedBtnStyle, border: '1px solid #FA6551' }} onClick={() => setZoom(zoom / 1.2)}>
//             Zoom Out
//           </Button>
//           <Typography sx={{ alignSelf: 'center' }}>{Math.round(zoom * 100)}%</Typography>
//           <Button variant="outlined" sx={{ ...containedBtnStyle, border: '1px solid #FA6551' }} onClick={() => setZoom(zoom * 1.2)}>
//             Zoom In
//           </Button>
//           <Button variant="outlined" sx={{ ...containedBtnStyle, border: '1px solid #FA6551' }} onClick={() => setZoom(1)}>
//             Reset
//           </Button>
//           <Button variant="outlined" sx={{ ...containedBtnStyle, border: '1px solid #FA6551' }} onClick={undo}>
//             Undo
//           </Button>
//           <Button variant="outlined" sx={{ ...containedBtnStyle, border: '1px solid #FA6551' }} onClick={redo}>
//             Redo
//           </Button>
//           <Button variant="contained" sx={containedBtnStyle} onClick={downloadCertificate}>
//             Download PNG
//           </Button>
//           <Button variant="contained" sx={containedBtnStyle} onClick={downloadCertificateAsPDF}>
//             Download PDF
//           </Button>
//           <Button variant="contained" sx={containedBtnStyle} onClick={downloadCanvasAsHTML}>
//             Download HTML
//           </Button>
//           <Button variant="outlined" sx={{ ...containedBtnStyle, border: '1px solid #FA6551' }} onClick={() => navigate('/')}>
//             Home
//           </Button>
//         </Box>
//         {activeTextId && (
//           <Toolbar
//             textSettings={textSettings}
//             handleToolbarChange={(field, value) =>
//               setTextSettings((prev) => ({ ...prev, [field]: value }))
//             }
//             handleToggle={(field) =>
//               setTextSettings((prev) => ({ ...prev, [field]: !prev[field] }))
//             }
//             handleSaveToolbar={handleSaveToolbar}
//           />
//         )}
//         <CanvasArea
//           canvasSize={canvasSize}
//           zoom={zoom}
//           stageRef={stageRef}
//           currentPage={certificate.pages[currentPageIndex]}
//           updateText={updateText}
//           updateShape={updateShape}
//           handleTextDblClick={handleTextDblClick}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default CertificateDesigner;


import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  TextField,
  Link,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import MenuIcon from '@mui/icons-material/Menu';
import PagesIcon from '@mui/icons-material/Description';
import TemplateIcon from '@mui/icons-material/Palette';
import VariableIcon from '@mui/icons-material/Pin';
import BackgroundIcon from '@mui/icons-material/Wallpaper';
import ImageIcon from '@mui/icons-material/Image';
import TextIcon from '@mui/icons-material/TextFields';
import FontIcon from '@mui/icons-material/FontDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SaveIcon from '@mui/icons-material/Save';

import BackgroundImage from '../components/BackgroundImage';
import PagesTab from '../components/PagesTab';
// import TemplatesTab from '../components/TemplatesTab';
import VariablesTab from '../components/VariablesTab';
// import BackgroundTab from '../components/BackgroundTab';
import ImagesTab from '../components/ImagesTab';
import FontsTab from '../components/FontsTab';
import TextTab from '../components/TextTab';
import TemplateSelector from './TemplateSelector';
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

export default function CertificateDesigner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('pages');
  const [certificate, setCertificate] = useState({
    id: id || Date.now().toString(),
    pages: [
      {
        id: 1,
        texts: [],
        shapes: [],
        backgroundColor: '#ffffff',
        backgroundImage: null,
        eSignature: null
      }
    ]
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 1123, height: 794 });
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const stageRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(null);
  const [selectedFont, setSelectedFont] = useState(null);

  // Full variables list (insert your complete array here)
  const variablesList = [
    'Aadhaar No.',
    'Academic Year',
    'ApprovedBy',
    // ... (rest of your variables)
    'Transcript ID'
  ];

  const [textSettings, setTextSettings] = useState({
    text: '',
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#000000',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    align: 'left'
  });
  const [activeTextId, setActiveTextId] = useState(null);

  // File and drag/drop handlers for fonts
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFont(e.target.files[0]);
    }
  };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFont(e.dataTransfer.files[0]);
    }
  };

  const handleTemplateSelect = (template) => {
    pushHistory();
    const newBgColor = '#000000';
    const textElements = Object.values(template.templateJson.rndElemSet)
      .filter(
        (elem) => elem.elementType === 'TEXT' || elem.elementType === 'VARIABLE'
      )
      .map((elem, index) => ({
        id: `text-${index + 1}-${Date.now()}`,
        text: elem.html,
        fontSize: elem.textStyle.fontSize || 18,
        fontFamily: elem.textStyle.fontFamily || 'Arial',
        x: elem.rndProps.position.x,
        y: elem.rndProps.position.y,
        color: elem.textStyle.color || '#000000',
        type: 'text'
      }));
    const updatedPages = [...certificate.pages];
    updatedPages[currentPageIndex].texts = textElements;
    updatedPages[currentPageIndex].backgroundColor = newBgColor;
    updatedPages[currentPageIndex].backgroundImage = template.imgUrl;
    console.log('New background image URL:', template.imgUrl);
    setCertificate({ ...certificate, pages: updatedPages });
  };

  useEffect(() => {
    const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
    const found = savedCertificates.find((cert) => cert.id === id);
    if (found) setCertificate(found);
  }, [id]);

  useEffect(() => {
    const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
    const otherCerts = savedCertificates.filter((cert) => cert.id !== certificate.id);
    localStorage.setItem('certificates', JSON.stringify([...otherCerts, certificate]));
  }, [certificate]);

  const pushHistory = () => {
    setHistory([...history, certificate]);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack([certificate, ...redoStack]);
    setHistory(history.slice(0, history.length - 1));
    setCertificate(previous);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory([...history, certificate]);
    setRedoStack(redoStack.slice(1));
    setCertificate(next);
  };

  const addPage = () => {
    pushHistory();
    const newPage = {
      id: certificate.pages.length + 1,
      texts: [],
      shapes: [],
      backgroundColor: '#ffffff',
      backgroundImage: null,
      eSignature: null
    };
    setCertificate({ ...certificate, pages: [...certificate.pages, newPage] });
    setCurrentPageIndex(certificate.pages.length);
  };

  const removePage = (pageIndex) => {
    if (certificate.pages.length === 1) return;
    pushHistory();
    const updatedPages = certificate.pages.filter((_, idx) => idx !== pageIndex);
    setCertificate({ ...certificate, pages: updatedPages });
    setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
  };

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedPageIndex(index);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPageIndex(null);
  };
  const handleMenuAddPage = () => {
    addPage();
    handleMenuClose();
  };
  const handleMenuRemovePage = () => {
    if (selectedPageIndex !== null) removePage(selectedPageIndex);
    handleMenuClose();
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${text} copied to clipboard!`);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  const handleAddText = (textLabel = 'New Text') => {
    pushHistory();
    const newText = {
      id: `text-${Date.now()}`,
      text: textLabel,
      fontSize: 24,
      fontFamily: 'Arial',
      x: 50,
      y: 50,
      color: '#000000',
      type: 'text'
    };
    const updatedPages = [...certificate.pages];
    updatedPages[currentPageIndex].texts.push(newText);
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const handleAddStyledText = (label, fontSize, fontFamily = 'Arial', color = '#000') => {
    pushHistory();
    const newText = {
      id: `text-${Date.now()}`,
      text: label,
      fontSize: fontSize,
      fontFamily: fontFamily,
      x: 50,
      y: 50,
      color: color,
      type: 'text'
    };
    const updatedPages = [...certificate.pages];
    updatedPages[currentPageIndex].texts.push(newText);
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const handleAddShape = (shapeType) => {
    pushHistory();
    const newShape = {
      id: `shape-${Date.now()}`,
      shapeType,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      radius: 50,
      points: [50, 50, 100, 100],
      fill: '#00D2FF',
      stroke: '#000000',
      strokeWidth: 2,
      opacity: 1,
      type: 'shape'
    };
    const updatedPages = [...certificate.pages];
    updatedPages[currentPageIndex].shapes.push(newShape);
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const handleAddESignature = () => {
    pushHistory();
    const updatedPages = certificate.pages.map((page, idx) =>
      idx === currentPageIndex
        ? {
            ...page,
            eSignature: 'https://via.placeholder.com/150x50?text=E-Signature'
          }
        : page
    );
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const updateText = (id, newAttrs) => {
    pushHistory();
    const updatedPages = certificate.pages.map((page, idx) =>
      idx === currentPageIndex
        ? {
            ...page,
            texts: page.texts.map((t) => (t.id === id ? { ...t, ...newAttrs } : t))
          }
        : page
    );
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const updateShape = (id, newAttrs) => {
    pushHistory();
    const updatedPages = certificate.pages.map((page, idx) =>
      idx === currentPageIndex
        ? {
            ...page,
            shapes: page.shapes.map((s) => (s.id === id ? { ...s, ...newAttrs } : s))
          }
        : page
    );
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const deleteElement = (id, elementType) => {
    pushHistory();
    const updatedPages = certificate.pages.map((page, idx) => {
      if (idx === currentPageIndex) {
        if (elementType === 'text')
          return { ...page, texts: page.texts.filter((t) => t.id !== id) };
        else if (elementType === 'shape')
          return { ...page, shapes: page.shapes.filter((s) => s.id !== id) };
      }
      return page;
    });
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const downloadCertificate = async () => {
    setZoom(1);
    await new Promise((resolve) => setTimeout(resolve, 500));
    for (let i = 0; i < certificate.pages.length; i++) {
      setCurrentPageIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (stageRef.current) {
        const dataURL = stageRef.current.toDataURL();
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `certificate-${certificate.id}-page-${i + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const downloadCertificateAsPDF = async () => {
    setZoom(1);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [canvasSize.width, canvasSize.height]
    });
    for (let i = 0; i < certificate.pages.length; i++) {
      setCurrentPageIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (stageRef.current) {
        const dataURL = stageRef.current.toDataURL();
        if (i > 0) pdf.addPage();
        pdf.addImage(dataURL, 'PNG', 0, 0, canvasSize.width, canvasSize.height);
      }
    }
    pdf.save(`certificate-${certificate.id}.pdf`);
  };

  const generateHTMLForCertificate = (certificate, canvasSize) => {
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Certificate</title>
        <style>
          body { margin: 0; padding: 20px; background: #eee; }
          .certificate-page {
            position: relative;
            width: ${canvasSize.width}px;
            height: ${canvasSize.height}px;
            margin: 20px auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.15);
          }
          .certificate-page img,
          .certificate-page div {
            position: absolute;
          }
        </style>
      </head>
      <body>
    `;
    certificate.pages.forEach((page) => {
      html += `<div class="certificate-page" style="
          background-color: ${page.backgroundColor};
          ${page.backgroundImage ? `background-image: url('${page.backgroundImage}'); background-size: cover;` : ''}
        ">`;
      if (page.eSignature) {
        html += `<img src="${page.eSignature}" alt="E-Signature" style="
            width: 150px;
            height: 50px;
            left: ${canvasSize.width - 200}px;
            top: ${canvasSize.height - 100}px;
          "/>`;
      }
      page.texts.forEach((txt) => {
        html += `<div style="
            left: ${txt.x}px;
            top: ${txt.y}px;
            font-size: ${txt.fontSize}px;
            font-family: ${txt.fontFamily};
            color: ${txt.color};
            ${txt.fontStyle ? `font-style: ${txt.fontStyle};` : ''}
            ${txt.textDecoration ? `text-decoration: ${txt.textDecoration};` : ''}
          ">${txt.text}</div>`;
      });
      page.shapes.forEach((shape) => {
        if (shape.shapeType === 'rectangle') {
          html += `<div style="
              left: ${shape.x}px;
              top: ${shape.y}px;
              width: ${shape.width}px;
              height: ${shape.height}px;
              background-color: ${shape.fill};
              border: ${shape.strokeWidth}px solid ${shape.stroke};
              opacity: ${shape.opacity};
            "></div>`;
        } else if (shape.shapeType === 'circle') {
          html += `<div style="
              left: ${shape.x - shape.radius}px;
              top: ${shape.y - shape.radius}px;
              width: ${shape.radius * 2}px;
              height: ${shape.radius * 2}px;
              background-color: ${shape.fill};
              border: ${shape.strokeWidth}px solid ${shape.stroke};
              opacity: ${shape.opacity};
              border-radius: 50%;
            "></div>`;
        } else if (shape.shapeType === 'line') {
          const pointsStr = shape.points.join(' ');
          html += `<svg style="position: absolute; left: 0; top: 0; overflow: visible;">
              <polyline points="${pointsStr}" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth}" opacity="${shape.opacity}" fill="none" />
            </svg>`;
        }
      });
      html += `</div>`;
    });
    html += `
      </body>
      </html>
    `;
    return html;
  };

  const downloadCanvasAsHTML = () => {
    const htmlContent = generateHTMLForCertificate(certificate, canvasSize);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificate-${certificate.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const pg = certificate.pages[currentPageIndex];
        if (pg.texts.length > 0) {
          deleteElement(pg.texts[pg.texts.length - 1].id, 'text');
        } else if (pg.shapes.length > 0) {
          deleteElement(pg.shapes[pg.shapes.length - 1].id, 'shape');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, currentPageIndex]);

  useEffect(() => {
    if (searchParams.get('download')) {
      setTimeout(() => {
        downloadCertificate();
      }, 500);
    }
  }, []);

  const currentPage = certificate.pages[currentPageIndex];

  const handleToolbarChange = (field, value) => {
    setTextSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    setTextSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveToolbar = () => {
    if (!activeTextId) return;
    let fontStyle = '';
    if (textSettings.isBold && textSettings.isItalic) {
      fontStyle = 'bold italic';
    } else if (textSettings.isBold) {
      fontStyle = 'bold';
    } else if (textSettings.isItalic) {
      fontStyle = 'italic';
    }
    const textDecoration = textSettings.isUnderline ? 'underline' : '';
    updateText(activeTextId, {
      text: textSettings.text,
      fontSize: textSettings.fontSize,
      fontFamily: textSettings.fontFamily,
      color: textSettings.color,
      fontStyle: fontStyle,
      textDecoration: textDecoration,
      align: textSettings.align
    });
    setActiveTextId(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar */}
      <Box sx={{ width: '27%', display: 'flex' }}>
        <Box
          sx={{
            width: 119,
            bgcolor: '#273142',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 2,
            pb: 2
          }}
        >
          <IconButton sx={{ color: '#fff', mb: 3 }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('pages')}
            >
              <PagesIcon />
              <Typography variant="caption">Pages</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('templates')}
            >
              <TemplateIcon />
              <Typography variant="caption">Templates</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('variables')}
            >
              <VariableIcon />
              <Typography variant="caption">Variables</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('background')}
            >
              <BackgroundIcon />
              <Typography variant="caption">Background</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('images')}
            >
              <ImageIcon />
              <Typography variant="caption">Images</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('text')}
            >
              <TextIcon />
              <Typography variant="caption">Text</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setActiveTab('fonts')}
            >
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
          {activeTab === 'pages' && (
            <PagesTab
              certificate={certificate}
              currentPageIndex={currentPageIndex}
              canvasSize={canvasSize}
              addPage={addPage}
              removePage={removePage}
              anchorEl={anchorEl}
              handleMenuClick={handleMenuClick}
              handleMenuClose={handleMenuClose}
              handleMenuAddPage={handleMenuAddPage}
              handleMenuRemovePage={handleMenuRemovePage}
              setCurrentPageIndex={setCurrentPageIndex}
            />
          )}
          {activeTab === 'templates' && (
            <TemplateSelector onSelectTemplate={handleTemplateSelect} />
          )}
          {activeTab === 'variables' && (
            <VariablesTab
              variablesList={variablesList}
              handleAddText={handleAddText}
              handleCopy={handleCopy}
            />
          )}
          {activeTab === 'background' && (
            <BackgroundImage
              certificate={certificate}
              currentPageIndex={currentPageIndex}
              setCertificate={setCertificate}
            />
          )}
          {activeTab === 'images' && (
            <ImagesTab handleAddESignature={handleAddESignature} />
          )}
          {activeTab === 'fonts' && (
            <FontsTab
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              selectedFont={selectedFont}
            />
          )}
          {activeTab === 'text' && (
            <TextTab handleAddStyledText={handleAddStyledText} />
          )}
        </Box>
      </Box>
      {/* Main Canvas & Toolbar */}
      <Box sx={{ width: '77%', p: 0, overflowY: 'auto' }}>
        <Box
          sx={{
            backgroundColor: '#fff',
            border: '10px solid #fff',
            padding: 2,
            mb: 2,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center'
          }}
        >
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
          <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => navigate('/')}>
            Home
          </Button>
        </Box>
        {activeTextId && (
          <Box
            sx={{
              backgroundColor: '#fff',
              borderBottom: '1px solid #ccc',
              p: 2,
              mb: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <FormControl size="small">
              <InputLabel>Font</InputLabel>
              <Select
                value={textSettings.fontFamily}
                label="Font"
                onChange={(e) => handleToolbarChange('fontFamily', e.target.value)}
              >
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
            <IconButton
              onClick={() => handleToggle('isBold')}
              color={textSettings.isBold ? 'primary' : 'default'}
            >
              <FormatBoldIcon />
            </IconButton>
            <IconButton
              onClick={() => handleToggle('isItalic')}
              color={textSettings.isItalic ? 'primary' : 'default'}
            >
              <FormatItalicIcon />
            </IconButton>
            <IconButton
              onClick={() => handleToggle('isUnderline')}
              color={textSettings.isUnderline ? 'primary' : 'default'}
            >
              <FormatUnderlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => handleToolbarChange('align', 'left')}
              color={textSettings.align === 'left' ? 'primary' : 'default'}
            >
              <FormatAlignLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => handleToolbarChange('align', 'center')}
              color={textSettings.align === 'center' ? 'primary' : 'default'}
            >
              <FormatAlignCenterIcon />
            </IconButton>
            <IconButton
              onClick={() => handleToolbarChange('align', 'right')}
              color={textSettings.align === 'right' ? 'primary' : 'default'}
            >
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
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ backgroundColor: '#FA6551' }}
              onClick={handleSaveToolbar}
            >
              Save
            </Button>
          </Box>
        )}
        <Box
          sx={{
            border: '1px solid #ccc',
            overflow: 'hidden',
            width: canvasSize.width,
            height: canvasSize.height,
            mb: 2,
            margin: '0 auto'
          }}
        >
          <Stage
            ref={stageRef}
            width={canvasSize.width}
            height={canvasSize.height}
            scaleX={zoom}
            scaleY={zoom}
          >
            <Layer>
              <Rect
                x={0}
                y={0}
                width={canvasSize.width}
                height={canvasSize.height}
                fill={currentPage.backgroundColor}
              />
              {currentPage.backgroundImage && (
                <BackgroundImage
                  url={currentPage.backgroundImage}
                  width={canvasSize.width}
                  height={canvasSize.height}
                />
              )}
              {currentPage.eSignature && (
                <BackgroundImage
                  url={currentPage.eSignature}
                  width={150}
                  height={50}
                  x={canvasSize.width - 200}
                  y={canvasSize.height - 100}
                />
              )}

              {currentPage.texts.map((txt) => (
                <Text
                  key={txt.id}
                  text={txt.text}
                  fontSize={txt.fontSize}
                  fontFamily={txt.fontFamily}
                  fill={txt.color}
                  fontStyle={txt.fontStyle}           
                  textDecoration={txt.textDecoration} 
                  align={txt.align || 'left'}
                  x={txt.x}
                  y={txt.y}
                  draggable
                  onDragEnd={(e) => updateText(txt.id, { x: e.target.x(), y: e.target.y() })}
                  onDblClick={(e) => {
                    const stage = e.target.getStage();
                    const container = stage.container();
                    const textarea = document.createElement('textarea');
                    container.appendChild(textarea);
                    textarea.value = txt.text;
                    textarea.style.position = 'absolute';
                    textarea.style.top = `${e.evt.clientY}px`;
                    textarea.style.left = `${e.evt.clientX}px`;
                    textarea.style.fontSize = `${txt.fontSize}px`;
                    textarea.style.fontFamily = txt.fontFamily;
                    textarea.style.color = txt.color;
                    textarea.addEventListener('pointerdown', (ev) => ev.stopPropagation());
                    const removeTextarea = () => {
                      updateText(txt.id, { text: textarea.value });
                      container.removeChild(textarea);
                      window.removeEventListener('pointerdown', removeTextarea);
                    };
                    window.addEventListener('pointerdown', removeTextarea);
                    textarea.focus();
                    setActiveTextId(txt.id);
                    setTextSettings({
                      text: txt.text,
                      fontSize: txt.fontSize,
                      fontFamily: txt.fontFamily,
                      color: txt.color,
                      isBold: txt.fontStyle?.includes('bold') || false,
                      isItalic: txt.fontStyle?.includes('italic') || false,
                      isUnderline: txt.textDecoration?.includes('underline') || false,
                      align: txt.align || 'left'
                    });
                  }}
                />
              ))}

              {currentPage.shapes.map((shape) => {
                if (shape.shapeType === 'rectangle') {
                  return (
                    <Rect
                      key={shape.id}
                      x={shape.x}
                      y={shape.y}
                      width={shape.width}
                      height={shape.height}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                      opacity={shape.opacity}
                      draggable
                      onDragEnd={(e) =>
                        updateShape(shape.id, {
                          x: e.target.x(),
                          y: e.target.y()
                        })
                      }
                    />
                  );
                }
                if (shape.shapeType === 'circle') {
                  return (
                    <Circle
                      key={shape.id}
                      x={shape.x}
                      y={shape.y}
                      radius={shape.radius}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                      opacity={shape.opacity}
                      draggable
                      onDragEnd={(e) =>
                        updateShape(shape.id, {
                          x: e.target.x(),
                          y: e.target.y()
                        })
                      }
                    />
                  );
                }
                if (shape.shapeType === 'line') {
                  return (
                    <Line
                      key={shape.id}
                      points={shape.points}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                      opacity={shape.opacity}
                      draggable
                      onDragEnd={(e) =>
                        updateShape(shape.id, {
                          x: e.target.x(),
                          y: e.target.y()
                        })
                      }
                    />
                  );
                }
                return null;
              })}
            </Layer>
          </Stage>
        </Box>
      </Box>
    </Box>
  );
}


