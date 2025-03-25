// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardHeader,
//   CardContent,
//   IconButton,
//   Divider,
//   Menu,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Link
// } from '@mui/material';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import {
//   Stage,
//   Layer,
//   Rect,
//   Text,
//   Circle,
//   Line,
//   Image as KonvaImage
// } from 'react-konva';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import { jsPDF } from 'jspdf';
// import useImage from 'use-image';
// import MenuIcon from '@mui/icons-material/Menu';
// import PagesIcon from '@mui/icons-material/Description';
// import TemplateIcon from '@mui/icons-material/Palette';
// import VariableIcon from '@mui/icons-material/Pin';
// import BackgroundIcon from '@mui/icons-material/Wallpaper';
// import ImageIcon from '@mui/icons-material/Image';
// import TextIcon from '@mui/icons-material/TextFields';
// import FontIcon from '@mui/icons-material/FontDownload';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import ColorLensIcon from '@mui/icons-material/ColorLens';
// import SaveIcon from '@mui/icons-material/Save';
// import TemplateSelector from './TemplateSelector';
// const containedBtnStyle = {
//   backgroundColor: '#FA6551',
//   color: '#fff',
//   '&:hover': { backgroundColor: '#FA6551' }
// };
// const outlinedBtnStyle = {
//   borderColor: '#FA6551',
//   color: '#FA6551',
//   '&:hover': {
//     borderColor: '#FA6551',
//     backgroundColor: 'rgba(250,101,81,0.1)'
//   }
// };
// const BackgroundImage = ({ url, width, height, x = 0, y = 0 }) => {
//   const [image] = useImage(url, 'Anonymous');
//   return image ? (
//     <KonvaImage image={image} width={width} height={height} x={x} y={y} />
//   ) : null;
// };
// const PageThumbnail = ({ page, canvasSize, scale = 0.2 }) => (
//   <Stage
//     width={canvasSize.width * scale}
//     height={canvasSize.height * scale}
//     scaleX={scale}
//     scaleY={scale}
//   >
//     <Layer>
//       <Rect
//         x={0}
//         y={0}
//         width={canvasSize.width}
//         height={canvasSize.height}
//         fill={page.backgroundColor}
//       />
//       {page.backgroundImage && (
//         <BackgroundImage
//           url={page.backgroundImage}
//           width={canvasSize.width}
//           height={canvasSize.height}
//         />
//       )}
//       {page.eSignature && (
//         <BackgroundImage
//           url={page.eSignature}
//           width={150}
//           height={50}
//           x={canvasSize.width - 200}
//           y={canvasSize.height - 100}
//         />
//       )}
//       {page.texts.map((txt) => (
//         <Text
//           key={txt.id}
//           text={txt.text}
//           fontSize={txt.fontSize}
//           fontFamily={txt.fontFamily}
//           fill={txt.color}
//           x={txt.x}
//           y={txt.y}
//         />
//       ))}
//       {page.shapes.map((shape) => {
//         if (shape.shapeType === 'rectangle')
//           return (
//             <Rect
//               key={shape.id}
//               x={shape.x}
//               y={shape.y}
//               width={shape.width}
//               height={shape.height}
//               fill={shape.fill}
//               stroke={shape.stroke}
//               strokeWidth={shape.strokeWidth}
//               opacity={shape.opacity}
//             />
//           );
//         if (shape.shapeType === 'circle')
//           return (
//             <Circle
//               key={shape.id}
//               x={shape.x}
//               y={shape.y}
//               radius={shape.radius}
//               fill={shape.fill}
//               stroke={shape.stroke}
//               strokeWidth={shape.strokeWidth}
//               opacity={shape.opacity}
//             />
//           );
//         if (shape.shapeType === 'line')
//           return (
//             <Line
//               key={shape.id}
//               points={shape.points}
//               stroke={shape.stroke}
//               strokeWidth={shape.strokeWidth}
//               opacity={shape.opacity}
//             />
//           );
//         return null;
//       })}
//     </Layer>
//   </Stage>
// );
// export default function CertificateDesigner() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [activeTab, setActiveTab] = useState('pages'); 
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
//   const stageRef = useRef(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedPageIndex, setSelectedPageIndex] = useState(null);
//   // const [activeTextId, setActiveTextId] = useState(null);
//   const [selectedFont, setSelectedFont] = useState(null);
//   const variablesList = [
//     'Aadhaar No.',
//     'Academic Year',
//     'ApprovedBy',
//     'Batch Code',
//     'Batch Duration',
//     'Batch End Date',
//     'Batch Name',
//     'Batch Start Date',
//     'Caste',
//     'Certificate No',
//     'CGPA',
//     'Course Name',
//     'Credit Point',
//     'Date of Birth',
//     'Degree Date',
//     'Degree Date (Regional)',
//     'Digilocker Id',
//     'District',
//     'Division',
//     'DivisionInRegional',
//     'Email',
//     'Enrollment No',
//     'EvaluatedBy',
//     'Exam Date',
//     'Exam Date (Regional)',
//     'Examination Centre',
//     'Father Name (Regional)',
//     'Father\'s Name',
//     'Grade Point',
//     'Background',
//     'Images',
//     'Hall Admit Number',
//     'Issued Date',
//     'Modules',
//     'Mother Name (Regional)',
//     'Mother\'s Name',
//     'Obtained Credits',
//     'Obtained Grades',
//     'Obtained Marks',
//     'Organization Name',
//     'Percentage',
//     'Percentile',
//     'Phone Number',
//     'Program Duration',
//     'Program Name',
//     'Program Name (Regional)',
//     'Rank',
//     'Registration No.',
//     'Religion',
//     'Remarks',
//     'Result',
//     'School Name',
//     'Background',
//     'School Name (Regional)',
//     'Serial No.',
//     'SGPA',
//     'Signatory Designation',
//     'Signatory Name',
//     'Specialization',
//     'State',
//     'Stream Code',
//     'Stream Name',
//     'Stream Name (Regional)',
//     'Student Name',
//     'Student Name (Regional)',
//     'Total Credits',
//     'Total Marks',
//     'Transcript ID'
// ];
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
//   const handleTemplateSelect = (template) => {
//     pushHistory();
//     const newBgColor = '#000000';
//     const textElements = Object.values(template.templateJson.rndElemSet)
//       .filter(
//         (elem) => elem.elementType === 'TEXT' || elem.elementType === 'VARIABLE'
//       )
//       .map((elem, index) => ({
//         id: `text-${index + 1}-${Date.now()}`,
//         text: elem.html,
//         fontSize: elem.textStyle.fontSize || 18,
//         fontFamily: elem.textStyle.fontFamily || 'Arial',
//         x: elem.rndProps.position.x,
//         y: elem.rndProps.position.y,
//         color: elem.textStyle.color || '#000000',
//         type: 'text'
//       }));
//     const updatedPages = [...certificate.pages];
//     updatedPages[currentPageIndex].texts = textElements;
//     updatedPages[currentPageIndex].backgroundColor = newBgColor;
//     updatedPages[currentPageIndex].backgroundImage = template.imgUrl;
//     console.log('New background image URL:', template.imgUrl);
//     setCertificate({ ...certificate, pages: updatedPages });
//   };
//   useEffect(() => {
//     const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
//     const found = savedCertificates.find((cert) => cert.id === id);
//     if (found) setCertificate(found);
//   }, [id]);
//   useEffect(() => {
//     const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
//     const otherCerts = savedCertificates.filter((cert) => cert.id !== certificate.id);
//     localStorage.setItem('certificates', JSON.stringify([...otherCerts, certificate]));
//   }, [certificate]);
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
//   const handleCopy = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       alert(`${text} copied to clipboard!`);
//     } catch (error) {
//       console.error('Failed to copy text: ', error);
//     }
//   };
//   const handleAddText = (textLabel = 'New Text') => {
//     pushHistory();
//     const newText = {
//       id: `text-${Date.now()}`,
//       text: textLabel,
//       fontSize: 24,
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
//   const handleAddStyledText = (label, fontSize, fontFamily = 'Arial', color = '#000') => {
//     pushHistory();
//     const newText = {
//       id: `text-${Date.now()}`,
//       text: label,
//       fontSize: fontSize,
//       fontFamily: fontFamily,
//       x: 50,
//       y: 50,
//       color: color,
//       type: 'text'
//     };
//     const updatedPages = [...certificate.pages];
//     updatedPages[currentPageIndex].texts.push(newText);
//     setCertificate({ ...certificate, pages: updatedPages });
//   };
//   const handleAddShape = (shapeType) => {
//     pushHistory();
//     const newShape = {
//       id: `shape-${Date.now()}`,
//       shapeType,
//       x: 100,
//       y: 100,
//       width: 100,
//       height: 100,
//       radius: 50,
//       points: [50, 50, 100, 100],
//       fill: '#00D2FF',
//       stroke: '#000000',
//       strokeWidth: 2,
//       opacity: 1,
//       type: 'shape'
//     };
//     const updatedPages = [...certificate.pages];
//     updatedPages[currentPageIndex].shapes.push(newShape);
//     setCertificate({ ...certificate, pages: updatedPages });
//   };
//   const handleAddESignature = () => {
//     pushHistory();
//     const updatedPages = certificate.pages.map((page, idx) =>
//       idx === currentPageIndex
//         ? {
//             ...page,
//             eSignature: 'https://via.placeholder.com/150x50?text=E-Signature'
//           }
//         : page
//     );
//     setCertificate({ ...certificate, pages: updatedPages });
//   };
//   const updateText = (id, newAttrs) => {
//     pushHistory();
//     const updatedPages = certificate.pages.map((page, idx) =>
//       idx === currentPageIndex
//         ? {
//             ...page,
//             texts: page.texts.map((t) => (t.id === id ? { ...t, ...newAttrs } : t))
//           }
//         : page
//     );
//     setCertificate({ ...certificate, pages: updatedPages });
//   };
//   const updateShape = (id, newAttrs) => {
//     pushHistory();
//     const updatedPages = certificate.pages.map((page, idx) =>
//       idx === currentPageIndex
//         ? {
//             ...page,
//             shapes: page.shapes.map((s) => (s.id === id ? { ...s, ...newAttrs } : s))
//           }
//         : page
//     );
//     setCertificate({ ...certificate, pages: updatedPages });
//   };
//   const deleteElement = (id, elementType) => {
//     pushHistory();
//     const updatedPages = certificate.pages.map((page, idx) => {
//       if (idx === currentPageIndex) {
//         if (elementType === 'text')
//           return { ...page, texts: page.texts.filter((t) => t.id !== id) };
//         else if (elementType === 'shape')
//           return { ...page, shapes: page.shapes.filter((s) => s.id !== id) };
//       }
//       return page;
//     });
//     setCertificate({ ...certificate, pages: updatedPages });
//   };
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
//   // Helper function to convert certificate data into an HTML string
// const generateHTMLForCertificate = (certificate, canvasSize) => {
//   let html = `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Certificate</title>
//     <style>
//       body { margin: 0; padding: 20px; background: #eee; }
//       .certificate-page {
//         position: relative;
//         width: ${canvasSize.width}px;
//         height: ${canvasSize.height}px;
//         margin: 20px auto;
//         box-shadow: 0 0 10px rgba(0,0,0,0.15);
//       }
//       .certificate-page img,
//       .certificate-page div {
//         position: absolute;
//       }
//     </style>
//   </head>
//   <body>
//   `;

//   certificate.pages.forEach((page) => {
//     html += `<div class="certificate-page" style="
//       background-color: ${page.backgroundColor};
//       ${page.backgroundImage ? `background-image: url('${page.backgroundImage}'); background-size: cover;` : ''}
//     ">`;

//     // Render eSignature if available
//     if (page.eSignature) {
//       html += `<img src="${page.eSignature}" alt="E-Signature" style="
//         width: 150px;
//         height: 50px;
//         left: ${canvasSize.width - 200}px;
//         top: ${canvasSize.height - 100}px;
//       "/>`;
//     }

//     // Render text elements
//     page.texts.forEach((txt) => {
//       html += `<div style="
//         left: ${txt.x}px;
//         top: ${txt.y}px;
//         font-size: ${txt.fontSize}px;
//         font-family: ${txt.fontFamily};
//         color: ${txt.color};
//         ${txt.fontStyle ? `font-style: ${txt.fontStyle};` : ''}
//         ${txt.textDecoration ? `text-decoration: ${txt.textDecoration};` : ''}
//       ">${txt.text}</div>`;
//     });

//     // Render shape elements
//     page.shapes.forEach((shape) => {
//       if (shape.shapeType === 'rectangle') {
//         html += `<div style="
//           left: ${shape.x}px;
//           top: ${shape.y}px;
//           width: ${shape.width}px;
//           height: ${shape.height}px;
//           background-color: ${shape.fill};
//           border: ${shape.strokeWidth}px solid ${shape.stroke};
//           opacity: ${shape.opacity};
//         "></div>`;
//       } else if (shape.shapeType === 'circle') {
//         html += `<div style="
//           left: ${shape.x - shape.radius}px;
//           top: ${shape.y - shape.radius}px;
//           width: ${shape.radius * 2}px;
//           height: ${shape.radius * 2}px;
//           background-color: ${shape.fill};
//           border: ${shape.strokeWidth}px solid ${shape.stroke};
//           opacity: ${shape.opacity};
//           border-radius: 50%;
//         "></div>`;
//       } else if (shape.shapeType === 'line') {
//         // For a line we use an SVG element
//         const pointsStr = shape.points.join(' ');
//         html += `<svg style="position: absolute; left: 0; top: 0; overflow: visible;">
//           <polyline points="${pointsStr}" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth}" opacity="${shape.opacity}" fill="none" />
//         </svg>`;
//       }
//     });

//     html += `</div>`; // End of certificate page container
//   });

//   html += `
//   </body>
//   </html>
//   `;
//   return html;
// };


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

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Delete' || e.key === 'Backspace') {
//         const pg = certificate.pages[currentPageIndex];
//         if (pg.texts.length > 0) {
//           deleteElement(pg.texts[pg.texts.length - 1].id, 'text');
//         } else if (pg.shapes.length > 0) {
//           deleteElement(pg.shapes[pg.shapes.length - 1].id, 'shape');
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [certificate, currentPageIndex]);
//   useEffect(() => {
//     if (searchParams.get('download')) {
//       setTimeout(() => {
//         downloadCertificate();
//       }, 500);
//     }
//   }, []);
//   const currentPage = certificate.pages[currentPageIndex];
//   const handleToolbarChange = (field, value) => {
//     setTextSettings((prev) => ({ ...prev, [field]: value }));
//   };
//   const handleToggle = (field) => {
//     setTextSettings((prev) => ({ ...prev, [field]: !prev[field] }));
//   };
//   const [activeTextId, setActiveTextId] = useState(null);
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
//       fontStyle: fontStyle,
//       textDecoration: textDecoration,
//       align: textSettings.align
//     });
//     setActiveTextId(null);
//   };
//   const renderLeftPanelContent = () => {
//     if (activeTab === 'pages') {
//       return (
//         <>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             Selected Page
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Current page seen here
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
//             <Button variant="contained" sx={containedBtnStyle} onClick={addPage}>
//               Add Page
//             </Button>
//             <Button
//               variant="outlined"
//               sx={outlinedBtnStyle}
//               onClick={() => removePage(currentPageIndex)}
//             >
//               Remove Page
//             </Button>
//           </Box>
//           {certificate.pages.map((page, index) => (
//             <Card
//               key={page.id}
//               sx={{
//                 mb: 2,
//                 border: index === currentPageIndex ? '2px solid #1976d2' : '1px solid #ccc',
//                 cursor: 'pointer'
//               }}
//               onClick={() => setCurrentPageIndex(index)}
//             >
//               <CardHeader
//                 title={`Page No.${index + 1}`}
//                 action={
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleMenuClick(e, index);
//                     }}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                 }
//               />
//               <CardContent>
//                 <Box sx={{ width: 200, height: 140 }}>
//                   <PageThumbnail page={page} canvasSize={canvasSize} />
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleMenuAddPage}>Add Page</MenuItem>
//             <MenuItem onClick={handleMenuRemovePage}>Remove Page</MenuItem>
//           </Menu>
//         </>
//       );
//     }
//     if (activeTab === 'templates') {
//       return <TemplateSelector onSelectTemplate={handleTemplateSelect} />;
//     }
//     if (activeTab === 'variables') {
//       return (
//         <>
//           {/* <Typography variant="h6" sx={{ mt: 2 }}>
//             Variables
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Insert dynamic fields (Name, Date, etc.)
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//             <Button
//               variant="contained"
//               sx={containedBtnStyle}
//               onClick={() => handleAddText('{{Name}}')}
//             >
//               Add Name
//             </Button>
//             <Button
//               variant="contained"
//               sx={containedBtnStyle}
//               onClick={() => handleAddText('{{Date}}')}
//             >
//               Add Date
//             </Button>
//           </Box> */}
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             Add Variables
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Don’t know,&nbsp;
//             <Link
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 alert('Explain how to use variables here!');
//               }}
//             >
//               how to use it?
//             </Link>
//           </Typography>

//           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             {variablesList.map((variable) => (
//               <Box
//                 key={variable}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   mb: 1,
//                   cursor: 'pointer'
//                 }}
//                 onClick={() => handleAddText(variable)}
//               >
//                 <Typography variant="body2" sx={{ color: '#828282' }}>
//                   {variable}
//                 </Typography>

//                 <IconButton
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleCopy(variable);
//                   }}
//                 >
//                   <ContentCopyIcon fontSize="small" />
//                 </IconButton>
//               </Box>
//             ))}
//           </Box>
//         </>
//       );
//     }
//     if (activeTab === 'background') {
//       return (
//         <>
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             Background
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Set a background color or image
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//             <Button
//               variant="contained"
//               sx={containedBtnStyle}
//               onClick={() => {
//                 const updatedPages = [...certificate.pages];
//                 updatedPages[currentPageIndex].backgroundColor = '#f0f0f0';
//                 setCertificate({ ...certificate, pages: updatedPages });
//               }}
//             >
//               Light Gray
//             </Button>
//             <Button
//               variant="contained"
//               sx={containedBtnStyle}
//               onClick={() => {
//                 const updatedPages = [...certificate.pages];
//                 updatedPages[currentPageIndex].backgroundImage =
//                   'https://via.placeholder.com/1123x794?text=Custom+BG';
//                 setCertificate({ ...certificate, pages: updatedPages });
//               }}
//             >
//               Placeholder Image
//             </Button>
//           </Box>
//         </>
//       );
//     }
//     if (activeTab === 'images') {
//       return (
//         <>
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             Images
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Insert additional images/logos
//           </Typography>
//           <Button variant="contained" sx={containedBtnStyle} onClick={handleAddESignature}>
//             Add E-Signature
//           </Button>
//         </>
//       );
//     }
//     if (activeTab === 'fonts') {
//       return (
//         <>
//           {/* <Typography variant="h6" sx={{ mt: 2 }}>
//             Fonts
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Customize fonts (coming soon)
//           </Typography> */}
//           <Typography variant="h6" sx={{ mt: 2 }}>
//         Fonts
//       </Typography>
//       <Typography variant="body2" sx={{ mb: 2 }}>
//         Customize fonts (coming soon)
//       </Typography>

//       {/* Drag-and-Drop Area */}
//       <Box
//         sx={{
//           border: '2px dashed grey',
//           borderRadius: '8px',
//           p: 3,
//           textAlign: 'center',
//           cursor: 'pointer',
//           mb: 2,
//         }}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         <input
//           type="file"
//           accept=".ttf,.otf,.woff,.woff2"
//           style={{ display: 'none' }}
//           id="font-upload"
//           onChange={handleFileChange}
//         />
//         <label htmlFor="font-upload">
//           <Typography variant="body2">
//             Drag and drop a font file here, or <strong>click</strong> to browse
//           </Typography>
//         </label>
//       </Box>

//       {selectedFont && (
//         <Typography variant="body2">
//           Selected file: {selectedFont.name}
//         </Typography>
//       )}
//       <Typography variant="subtitle1" sx={{ mt: 3 }}>
//         Existing Custom Fonts:
//       </Typography>
//       {/* <Typography variant="body2">AkrutiOriBhavana06Medium</Typography>
//       <Typography variant="body2">AkrutiOriSubhadraUnicode Bold</Typography> */}
//         </>
//       );
//     }
//     if (activeTab === 'text') {
//       return (
//         <Box sx={{ p: 1 }}>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             Add Text
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             You can add text and modify it as per your requirement
//           </Typography>
//           <Typography
//             variant="h4"
//             sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
//             onClick={() => handleAddStyledText('Header 1', 32)}
//           >
//             Header 1
//           </Typography>
//           <Typography
//             variant="h5"
//             sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
//             onClick={() => handleAddStyledText('Header 2', 28)}
//           >
//             Header 2
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
//             onClick={() => handleAddStyledText('Header 3', 24)}
//           >
//             Header 3
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
//             onClick={() => handleAddStyledText('Header 4', 20)}
//           >
//             Header 4
//           </Typography>
//           <Typography
//             variant="subtitle2"
//             sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
//             onClick={() => handleAddStyledText('Header 5', 18)}
//           >
//             Header 5
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
//             onClick={() => handleAddStyledText('Body Font 1', 16)}
//           >
//             Body Font 1
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
//             onClick={() => handleAddStyledText('Body Font 1', 16)}
//           >
//             Body Font 1
//           </Typography>
//           <Typography
//             variant="caption"
//             sx={{
//               display: 'block',
//               mb: 1,
//               pb: 1,
//               borderBottom: '1px solid #ddd',
//               cursor: 'pointer'
//             }}
//             onClick={() => handleAddStyledText('Caption', 12)}
//           >
//             Caption
//           </Typography>
//         </Box>
//       );
//     }
//     return null;
//   };
//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <Box sx={{ width: '27%', display: 'flex' }}>
//         <Box
//           sx={{
//             width: 119,
//             bgcolor: '#273142',
//             color: '#fff',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             pt: 2,
//             pb: 2
//           }}
//         >
//           <IconButton sx={{ color: '#fff', mb: 3 }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
//               onClick={() => setActiveTab('pages')}
//             >
//               <PagesIcon />
//               <Typography variant="caption">Pages</Typography>
//             </Box>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
//               onClick={() => setActiveTab('templates')}
//             >
//               <TemplateIcon />
//               <Typography variant="caption">Templates</Typography>
//             </Box>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
//               onClick={() => setActiveTab('variables')}
//             >
//               <VariableIcon />
//               <Typography variant="caption">Variables</Typography>
//             </Box>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
//               onClick={() => setActiveTab('background')}
//             >
//               <BackgroundIcon />
//               <Typography variant="caption">Background</Typography>
//             </Box>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
//               onClick={() => setActiveTab('images')}
//             >
//               <ImageIcon />
//               <Typography variant="caption">Images</Typography>
//             </Box>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
//               onClick={() => setActiveTab('text')}
//             >
//               <TextIcon />
//               <Typography variant="caption">Text</Typography>
//             </Box>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
//               onClick={() => setActiveTab('fonts')}
//             >
//               <FontIcon />
//               <Typography variant="caption">Fonts</Typography>
//             </Box>
//           </Box>
//           <Box sx={{ mt: 'auto', textAlign: 'center' }}>
//             <Divider sx={{ mb: 1, bgcolor: '#4a4a4a' }} />
//             <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
//               Powered by
//             </Typography>
//             <Box
//               component="img"
//               src="https://truscholar-assets-public.s3.ap-south-1.amazonaws.com/websiteimages/ts+logo+hat+in+top-01.svg"
//               sx={{ width: '80%', mt: 1 }}
//             />
//           </Box>
//         </Box>
//         <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#ffffff', overflowY: 'auto' }}>
//           {renderLeftPanelContent()}
//         </Box>
//       </Box>
//       <Box sx={{ width: '77%', p: 0, overflowY: 'auto' }}>
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             border: '10px solid #fff',
//             padding: 2,
//             mb: 2,
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 1,
//             justifyContent: 'center'
//           }}
//         >
//           <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => setZoom(zoom / 1.2)}>
//             Zoom Out
//           </Button>
//           <Typography sx={{ alignSelf: 'center' }}>
//             {Math.round(zoom * 100)}%
//           </Typography>
//           <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => setZoom(zoom * 1.2)}>
//             Zoom In
//           </Button>
//           <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => setZoom(1)}>
//             Reset
//           </Button>
//           <Button variant="outlined" sx={outlinedBtnStyle} onClick={undo}>
//             Undo
//           </Button>
//           <Button variant="outlined" sx={outlinedBtnStyle} onClick={redo}>
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
//           <Button variant="outlined" sx={outlinedBtnStyle} onClick={() => navigate('/')}>
//             Home
//           </Button>
//         </Box>
//         {activeTextId && (
//           <Box
//             sx={{
//               backgroundColor: '#fff',
//               borderBottom: '1px solid #ccc',
//               p: 2,
//               mb: 2,
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: 2,
//               alignItems: 'center'
//             }}
//           >
//             <FormControl size="small">
//               <InputLabel>Font</InputLabel>
//               <Select
//                 value={textSettings.fontFamily}
//                 label="Font"
//                 onChange={(e) => handleToolbarChange('fontFamily', e.target.value)}
//               >
//                 <MenuItem value="Arial">Arial</MenuItem>
//                 <MenuItem value="Roboto">Roboto</MenuItem>
//                 <MenuItem value="Times New Roman">Times New Roman</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               label="Size"
//               type="number"
//               size="small"
//               sx={{ width: 80 }}
//               value={textSettings.fontSize}
//               onChange={(e) => handleToolbarChange('fontSize', parseInt(e.target.value) || 1)}
//             />
//             <IconButton
//               onClick={() => handleToggle('isBold')}
//               color={textSettings.isBold ? 'primary' : 'default'}
//             >
//               <FormatBoldIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => handleToggle('isItalic')}
//               color={textSettings.isItalic ? 'primary' : 'default'}
//             >
//               <FormatItalicIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => handleToggle('isUnderline')}
//               color={textSettings.isUnderline ? 'primary' : 'default'}
//             >
//               <FormatUnderlinedIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => handleToolbarChange('align', 'left')}
//               color={textSettings.align === 'left' ? 'primary' : 'default'}
//             >
//               <FormatAlignLeftIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => handleToolbarChange('align', 'center')}
//               color={textSettings.align === 'center' ? 'primary' : 'default'}
//             >
//               <FormatAlignCenterIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => handleToolbarChange('align', 'right')}
//               color={textSettings.align === 'right' ? 'primary' : 'default'}
//             >
//               <FormatAlignRightIcon />
//             </IconButton>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <ColorLensIcon />
//               <TextField
//                 type="color"
//                 size="small"
//                 value={textSettings.color}
//                 onChange={(e) => handleToolbarChange('color', e.target.value)}
//                 sx={{ width: 50 }}
//               />
//             </Box>
//             <TextField
//               label="Text"
//               size="small"
//               value={textSettings.text}
//               onChange={(e) => handleToolbarChange('text', e.target.value)}
//             />
//             <Button
//               variant="contained"
//               startIcon={<SaveIcon />}
//               sx={{ backgroundColor: '#FA6551' }}
//               onClick={handleSaveToolbar}
//             >
//               Save
//             </Button>
//           </Box>
//         )}
//         <Box
//           sx={{
//             border: '1px solid #ccc',
//             overflow: 'hidden',
//             width: canvasSize.width,
//             height: canvasSize.height,
//             mb: 2,
//             margin: '0 auto'
//           }}
//         >
//           <Stage
//             ref={stageRef}
//             width={canvasSize.width}
//             height={canvasSize.height}
//             scaleX={zoom}
//             scaleY={zoom}
//           >
//             <Layer>
//               <Rect
//                 x={0}
//                 y={0}
//                 width={canvasSize.width}
//                 height={canvasSize.height}
//                 fill={currentPage.backgroundColor}
//               />
//               {currentPage.backgroundImage && (
//                 <BackgroundImage
//                   url={currentPage.backgroundImage}
//                   width={canvasSize.width}
//                   height={canvasSize.height}
//                 />
//               )}
//               {currentPage.eSignature && (
//                 <BackgroundImage
//                   url={currentPage.eSignature}
//                   width={150}
//                   height={50}
//                   x={canvasSize.width - 200}
//                   y={canvasSize.height - 100}
//                 />
//               )}

//               {currentPage.texts.map((txt) => (
//                 <Text
//                   key={txt.id}
//                   text={txt.text}
//                   fontSize={txt.fontSize}
//                   fontFamily={txt.fontFamily}
//                   fill={txt.color}
//                   fontStyle={txt.fontStyle}           
//                   textDecoration={txt.textDecoration} 
//                   align={txt.align || 'left'}
//                   x={txt.x}
//                   y={txt.y}
//                   draggable
//                   onDragEnd={(e) => updateText(txt.id, { x: e.target.x(), y: e.target.y() })}
//                   onDblClick={(e) => {
//                     const stage = e.target.getStage();
//                     const container = stage.container();
//                     const textarea = document.createElement('textarea');
//                     container.appendChild(textarea);
//                     textarea.value = txt.text;
//                     textarea.style.position = 'absolute';
//                     textarea.style.top = `${e.evt.clientY}px`;
//                     textarea.style.left = `${e.evt.clientX}px`;
//                     textarea.style.fontSize = `${txt.fontSize}px`;
//                     textarea.style.fontFamily = txt.fontFamily;
//                     textarea.style.color = txt.color;
//                     textarea.addEventListener('pointerdown', (ev) => ev.stopPropagation());
//                     const removeTextarea = () => {
//                       updateText(txt.id, { text: textarea.value });
//                       container.removeChild(textarea);
//                       window.removeEventListener('pointerdown', removeTextarea);
//                     };
//                     window.addEventListener('pointerdown', removeTextarea);
//                     textarea.focus();
//                     setActiveTextId(txt.id);
//                     setTextSettings({
//                       text: txt.text,
//                       fontSize: txt.fontSize,
//                       fontFamily: txt.fontFamily,
//                       color: txt.color,
//                       isBold: txt.fontStyle?.includes('bold') || false,
//                       isItalic: txt.fontStyle?.includes('italic') || false,
//                       isUnderline: txt.textDecoration?.includes('underline') || false,
//                       align: txt.align || 'left'
//                     });
//                   }}
//                 />
//               ))}

//               {currentPage.shapes.map((shape) => {
//                 if (shape.shapeType === 'rectangle') {
//                   return (
//                     <Rect
//                       key={shape.id}
//                       x={shape.x}
//                       y={shape.y}
//                       width={shape.width}
//                       height={shape.height}
//                       fill={shape.fill}
//                       stroke={shape.stroke}
//                       strokeWidth={shape.strokeWidth}
//                       opacity={shape.opacity}
//                       draggable
//                       onDragEnd={(e) =>
//                         updateShape(shape.id, {
//                           x: e.target.x(),
//                           y: e.target.y()
//                         })
//                       }
//                     />
//                   );
//                 }
//                 if (shape.shapeType === 'circle') {
//                   return (
//                     <Circle
//                       key={shape.id}
//                       x={shape.x}
//                       y={shape.y}
//                       radius={shape.radius}
//                       fill={shape.fill}
//                       stroke={shape.stroke}
//                       strokeWidth={shape.strokeWidth}
//                       opacity={shape.opacity}
//                       draggable
//                       onDragEnd={(e) =>
//                         updateShape(shape.id, {
//                           x: e.target.x(),
//                           y: e.target.y()
//                         })
//                       }
//                     />
//                   );
//                 }
//                 if (shape.shapeType === 'line') {
//                   return (
//                     <Line
//                       key={shape.id}
//                       points={shape.points}
//                       stroke={shape.stroke}
//                       strokeWidth={shape.strokeWidth}
//                       opacity={shape.opacity}
//                       draggable
//                       onDragEnd={(e) =>
//                         updateShape(shape.id, {
//                           x: e.target.x(),
//                           y: e.target.y()
//                         })
//                       }
//                     />
//                   );
//                 }
//                 return null;
//               })}
//             </Layer>
//           </Stage>
//         </Box>
//       </Box>
//     </Box>
//   );
// }





import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Line,
  Image as KonvaImage
} from 'react-konva';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import useImage from 'use-image';
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
import TemplateSelector from './TemplateSelector';
import { ListSubheader } from '@mui/material';
import ESignatureTab from './ESignatureTab';
import LeftPanel from './LeftPanel';
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

const BackgroundImage = ({ url, width, height, x = 0, y = 0 }) => {
  const [image] = useImage(url, 'Anonymous');
  return image ? (
    <KonvaImage image={image} width={width} height={height} x={x} y={y} />
  ) : null;
};

const PageThumbnail = ({ page, canvasSize, scale = 0.2, onThumbnailClick }) => (
  <Stage
    width={canvasSize.width * scale}
    height={canvasSize.height * scale}
    scaleX={scale}
    scaleY={scale}
    onClick={onThumbnailClick}
  >
    <Layer>
      <Rect
        x={0}
        y={0}
        width={canvasSize.width}
        height={canvasSize.height}
        fill={page.backgroundColor}
      />
      {page.backgroundImage && (
        <BackgroundImage
          url={page.backgroundImage}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      )}
      {page.eSignature && (
        <BackgroundImage
          url={page.eSignature}
          width={150}
          height={50}
          x={canvasSize.width - 200}
          y={canvasSize.height - 100}
        />
      )}
      {page.texts.map((txt) => (
        <Text
          key={txt.id}
          text={txt.text}
          fontSize={txt.fontSize}
          fontFamily={txt.fontFamily}
          fill={txt.color}
          x={txt.x}
          y={txt.y}
        />
      ))}
      {page.shapes.map((shape) => {
        if (shape.shapeType === 'rectangle')
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
            />
          );
        if (shape.shapeType === 'circle')
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
            />
          );
        if (shape.shapeType === 'line')
          return (
            <Line
              key={shape.id}
              points={shape.points}
              stroke={shape.stroke}
              strokeWidth={shape.strokeWidth}
              opacity={shape.opacity}
            />
          );
        return null;
      })}
    </Layer>
  </Stage>
);

export default function CertificateDesigner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('pages');
  const defaultFonts = ["Arial", "Roboto", "Times New Roman"];
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
  const variablesList = [
    'Aadhaar No.',
    'Academic Year',
    'ApprovedBy',
    'Batch Code',
    'Batch Duration',
    'Batch End Date',
    'Batch Name',
    'Batch Start Date',
    'Caste',
    'Certificate No',
    'CGPA',
    'Course Name',
    'Credit Point',
    'Date of Birth',
    'Degree Date',
    'Degree Date (Regional)',
    'Digilocker Id',
    'District',
    'Division',
    'DivisionInRegional',
    'Email',
    'Enrollment No',
    'EvaluatedBy',
    'Exam Date',
    'Exam Date (Regional)',
    'Examination Centre',
    'Father Name (Regional)',
    "Father's Name",
    'Grade Point',
    'Background',
    'Images',
    'Hall Admit Number',
    'Issued Date',
    'Modules',
    'Mother Name (Regional)',
    "Mother's Name",
    'Obtained Credits',
    'Obtained Grades',
    'Obtained Marks',
    'Organization Name',
    'Percentage',
    'Percentile',
    'Phone Number',
    'Program Duration',
    'Program Name',
    'Program Name (Regional)',
    'Rank',
    'Registration No.',
    'Religion',
    'Remarks',
    'Result',
    'School Name',
    'Background',
    'School Name (Regional)',
    'Serial No.',
    'SGPA',
    'Signatory Designation',
    'Signatory Name',
    'Specialization',
    'State',
    'Stream Code',
    'Stream Name',
    'Stream Name (Regional)',
    'Student Name',
    'Student Name (Regional)',
    'Total Credits',
    'Total Marks',
    'Transcript ID'
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFont(e.dataTransfer.files[0]);
    }
  };

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

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
    const found = savedCertificates.find((cert) => cert.id === id);
    if (found) {
      console.log("Certificate found:", found);
      setCertificate(found);
    } else {
      console.warn("Certificate not found in storage. Using default.");
    }
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    if (!isLoaded) return;
    const savedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
    const otherCerts = savedCertificates.filter((cert) => cert.id !== certificate.id);
    localStorage.setItem('certificates', JSON.stringify([...otherCerts, certificate]));
  }, [certificate, isLoaded]);


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
    event.preventDefault();
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

  // Helper function to convert certificate data into an HTML string
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

      // Render eSignature if available
      if (page.eSignature) {
        html += `<img src="${page.eSignature}" alt="E-Signature" style="
          width: 150px;
          height: 50px;
          left: ${canvasSize.width - 200}px;
          top: ${canvasSize.height - 100}px;
        "/>`;
      }

      // Render text elements
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

      // Render shape elements
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
  }, [searchParams]);

  const currentPage = certificate.pages[currentPageIndex];

  const handleToolbarChange = (field, value) => {
    setTextSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    setTextSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const [activeTextId, setActiveTextId] = useState(null);
  useEffect(() => {
    if (activeTextId) {
      const timer = setTimeout(() => {
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
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [textSettings, activeTextId]);
  const [customFonts, setCustomFonts] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFont(file);
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const fontDataUrl = ev.target.result;
        const fontFamilyName = `${file.name.split('.')[0]}-${Date.now()}`;
        try {
          const font = new FontFace(fontFamilyName, `url(${fontDataUrl})`);
          await font.load();
          document.fonts.add(font);
          setCustomFonts((prev) => [...prev, { fontFamily: fontFamilyName, file }]);
          handleToolbarChange('fontFamily', fontFamilyName);
        } catch (err) {
          console.error("Error loading custom font:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const updateESignature = ({ src, x, y }) => {
    pushHistory();
    const updatedPages = certificate.pages.map((page, idx) =>
      idx === currentPageIndex
        ? { ...page, eSignature: src, signaturePosition: { x, y } }
        : page
    );
    setCertificate({ ...certificate, pages: updatedPages });
  };

  const renderLeftPanelContent = () => {
    if (activeTab === 'pages') {
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
              onClick={(e) => {
                e.preventDefault();
                setCurrentPageIndex(index);
                navigate(`/certificate/${certificate.id}`);
              }}
            >
              <CardHeader
                title={`Page No.${index + 1}`}
                action={
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(e, index);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Box sx={{ width: 200, height: 140 }}>
                  <PageThumbnail
                    page={page}
                    canvasSize={canvasSize}
                    onThumbnailClick={(e) => {
                      e.preventDefault();
                      setCurrentPageIndex(index);
                      navigate(`/certificate/${certificate.id}`);
                    }}
                  />
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
                const updatedPages = [...certificate.pages];
                updatedPages[currentPageIndex].backgroundColor = '#f0f0f0';
                setCertificate({ ...certificate, pages: updatedPages });
              }}
            >
              Light Gray
            </Button>
            <Button
              variant="contained"
              sx={containedBtnStyle}
              onClick={() => {
                const updatedPages = [...certificate.pages];
                updatedPages[currentPageIndex].backgroundImage =
                  'https://via.placeholder.com/1123x794?text=Custom+BG';
                setCertificate({ ...certificate, pages: updatedPages });
              }}
            >
              Placeholder Image
            </Button>
          </Box>
        </>
      );
    }
    if (activeTab === 'images') {
      return <ESignatureTab canvasSize={canvasSize} updateESignature={updateESignature} />;
    }
    if (activeTab === 'fonts') {
      return (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Fonts
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Upload a font file to use it in your certificate.
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
                Drag and drop a font file here, or <strong>click</strong> to browse.
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
          <Box sx={{ mt: 1 }}>
            {customFonts.length > 0 ? (
              customFonts.map((font) => (
                <Typography key={font.fontFamily} variant="body2">
                  {font.fontFamily}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No custom fonts loaded yet.
              </Typography>
            )}
          </Box>
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
          <Typography
            variant="h4"
            sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleAddStyledText('Header 1', 32)}
          >
            Header 1
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleAddStyledText('Header 2', 28)}
          >
            Header 2
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleAddStyledText('Header 3', 24)}
          >
            Header 3
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleAddStyledText('Header 4', 20)}
          >
            Header 4
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleAddStyledText('Header 5', 18)}
          >
            Header 5
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleAddStyledText('Body Font 1', 16)}
          >
            Body Font 1
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, pb: 1, borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleAddStyledText('Body Font 2', 14)}
          >
            Body Font 2
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 1,
              pb: 1,
              borderBottom: '1px solid #ddd',
              cursor: 'pointer'
            }}
            onClick={() => handleAddStyledText('Caption', 12)}
          >
            Caption
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
          {renderLeftPanelContent()}
          {/* <LeftPanel onSelectTemplate={renderLeftPanelContent()}/> */}
        </Box>
      </Box>
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
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ccc',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Left Group: Font & Style */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <FormControl variant="outlined" size="small">
                <InputLabel id="font-family-label">Font</InputLabel>
                <Select
                  labelId="font-family-label"
                  label="Font"
                  value={textSettings.fontFamily}
                  onChange={(e) => handleToolbarChange('fontFamily', e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  {/* <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Roboto">Roboto</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
        </Select> */}
                  {defaultFonts.map((font) => (
                    <MenuItem key={font} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                  {customFonts.length > 0 && (
                    <ListSubheader>Custom Fonts</ListSubheader>
                  )}
                  {customFonts.map((font) => (
                    <MenuItem key={font.fontFamily} value={font.fontFamily}>
                      {font.fontFamily}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Size"
                type="number"
                variant="outlined"
                size="small"
                value={textSettings.fontSize}
                onChange={(e) =>
                  handleToolbarChange('fontSize', parseInt(e.target.value) || 1)
                }
                sx={{ width: 80 }}
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
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            {/* Center Group: Alignment */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            {/* Right Group: Color & Text Input */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLensIcon />
                <TextField
                  type="color"
                  variant="outlined"
                  size="small"
                  value={textSettings.color}
                  onChange={(e) => handleToolbarChange('color', e.target.value)}
                  sx={{ width: 50, p: 0, border: 'none' }}
                />
              </Box>
              {/* <TextField
        label="Text"
        variant="outlined"
        size="small"
        value={textSettings.text}
        onChange={(e) => handleToolbarChange('text', e.target.value)}
      /> */}
            </Box>
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
            offsetX={canvasSize.width / 2}
            offsetY={canvasSize.height / 2}
            x={canvasSize.width / 2}
            y={canvasSize.height / 2}
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
