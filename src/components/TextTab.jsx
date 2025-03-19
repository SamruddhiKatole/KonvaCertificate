// // import React, { useState, useRef } from "react";
// // import { Box, Typography } from "@mui/material";
// // import { Stage, Layer, Text } from "react-konva";

// // const TextTab = () => {
// //   const [texts, setTexts] = useState([]);
// //   const [editingText, setEditingText] = useState(null);
// //   const stageRef = useRef();
// //   const textareaRef = useRef();

// //   // Function to add new text
// //   const handleAddStyledText = (text, fontSize) => {
// //     setTexts([
// //       ...texts,
// //       { id: texts.length + 1, text, x: 50, y: 50, fontSize },
// //     ]);
// //   };

// //   // Enable inline editing
// //   const handleTextDblClick = (e, textObj) => {
// //     setEditingText(textObj);
// //     const stage = stageRef.current.getStage();
// //     const container = stage.container();
// //     const absPos = e.target.getAbsolutePosition();

// //     // Create an editable textarea
// //     const textarea = document.createElement("textarea");
// //     textarea.value = textObj.text;
// //     textarea.style.position = "absolute";
// //     textarea.style.top = `${absPos.y + stage.container().offsetTop}px`;
// //     textarea.style.left = `${absPos.x + stage.container().offsetLeft}px`;
// //     textarea.style.width = `${e.target.width() * 1.2}px`;
// //     textarea.style.height = `${e.target.height()}px`;
// //     textarea.style.fontSize = `${textObj.fontSize}px`;
// //     textarea.style.fontFamily = "Arial, sans-serif";
// //     textarea.style.border = "1px solid #000";
// //     textarea.style.padding = "4px";
// //     textarea.style.margin = "0px";
// //     textarea.style.background = "white";
// //     textarea.style.color = "black";
// //     textarea.style.outline = "none";
// //     textarea.style.overflow = "hidden";
// //     textarea.style.whiteSpace = "nowrap";
// //     textarea.style.zIndex = "1000";
// //     textarea.style.transformOrigin = "left top";
// //     textarea.style.transform = `scale(${stage.scaleX()})`;

// //     container.appendChild(textarea);
// //     textarea.focus();
// //     textareaRef.current = textarea;

// //     // Handle text update
// //     const removeTextarea = () => {
// //       setTexts((prevTexts) =>
// //         prevTexts.map((t) =>
// //           t.id === textObj.id ? { ...t, text: textarea.value } : t
// //         )
// //       );
// //       container.removeChild(textarea);
// //       setEditingText(null);
// //     };

// //     textarea.addEventListener("keydown", (event) => {
// //       if (event.key === "Enter") {
// //         event.preventDefault();
// //         removeTextarea();
// //       }
// //     });

// //     setTimeout(() => {
// //       window.addEventListener("click", (event) => {
// //         if (!textarea.contains(event.target)) {
// //           removeTextarea();
// //         }
// //       });
// //     });
// //   };

// //   return (
// //     <Box sx={{ p: 1 }}>
// //       <Typography variant="h6" sx={{ mb: 1 }}>Add Text</Typography>
// //       <Typography variant="body2" sx={{ mb: 2 }}>
// //         Click on a text type below to add it. Double-click to edit in place.
// //       </Typography>

// //       {/* Text Options */}
// //       {[
// //         { text: "Header 1", fontSize: 32, variant: "h4" },
// //         { text: "Header 2", fontSize: 28, variant: "h5" },
// //         { text: "Header 3", fontSize: 24, variant: "h6" },
// //         { text: "Body Text", fontSize: 16, variant: "body1" },
// //         { text: "Caption", fontSize: 12, variant: "caption" },
// //       ].map(({ text, fontSize, variant }) => (
// //         <Typography
// //           key={text}
// //           variant={variant}
// //           sx={{ mb: 1, pb: 1, borderBottom: "1px solid #ddd", cursor: "pointer" }}
// //           onClick={() => handleAddStyledText(text, fontSize)}
// //         >
// //           {text}
// //         </Typography>
// //       ))}

// //       {/* Konva Canvas for text editing */}
// //       <Stage width={window.innerWidth} height={500} ref={stageRef}>
// //         <Layer>
// //           {texts.map((txt) => (
// //             <Text
// //               key={txt.id}
// //               text={txt.text}
// //               x={txt.x}
// //               y={txt.y}
// //               fontSize={txt.fontSize}
// //               fill="black"
// //               draggable
// //               onDblClick={(e) => handleTextDblClick(e, txt)}
// //             />
// //           ))}
// //         </Layer>
// //       </Stage>
// //     </Box>
// //   );
// // };

// // export default TextTab;

// import React, { useState, useRef } from "react";
// import { Box, Typography } from "@mui/material";
// import { Stage, Layer, Text } from "react-konva";
// import { useDispatch, useSelector } from "react-redux";
// import { addText, updateText } from "../redux/textSlice.js";
// import TextToolbar from "./TextToolbar";

// const TextTab = () => {
//   const dispatch = useDispatch();
//   const texts = useSelector((state) => state.text.textItems);
//   const [editingId, setEditingId] = useState(null);
//   const stageRef = useRef();
//   const textareaRef = useRef();

//   // Function to add new text using Redux
//   const handleAddStyledText = (text, fontSize) => {
//     const id = Date.now().toString();
//     dispatch(
//       addText({
//         id,
//         content: text,
//         x: 50,
//         y: 50,
//         fontSize,
//         fontFamily: "Arial, sans-serif",
//         fontWeight: "normal",
//         fontStyle: "normal",
//         textDecoration: "none",
//         textAlign: "left",
//       })
//     );
//   };

//   // Enable inline editing with a textarea that appears at the text’s top-left corner
//   const handleTextDblClick = (e, id) => {
//     setEditingId(id);
//     const textData = texts[id];
//     const stage = stageRef.current.getStage();
//     const container = stage.container();
//     const absPos = e.target.getAbsolutePosition();

//     // Create an editable textarea positioned at the top-left of the text element
//     const textarea = document.createElement("textarea");
//     textarea.value = textData.content;
//     textarea.style.position = "absolute";
//     textarea.style.top = `${absPos.y + container.offsetTop}px`;
//     textarea.style.left = `${absPos.x + container.offsetLeft}px`;
//     textarea.style.width = `${e.target.width() * 1.2}px`;
//     textarea.style.height = `${e.target.height()}px`;
//     textarea.style.fontSize = `${textData.fontSize}px`;
//     textarea.style.fontFamily = textData.fontFamily;
//     textarea.style.border = "1px solid #000";
//     textarea.style.padding = "4px";
//     textarea.style.margin = "0px";
//     textarea.style.background = "white";
//     textarea.style.color = "black";
//     textarea.style.outline = "none";
//     textarea.style.overflow = "hidden";
//     textarea.style.whiteSpace = "nowrap";
//     textarea.style.zIndex = "1000";

//     container.appendChild(textarea);
//     textarea.focus();
//     textareaRef.current = textarea;

//     // Remove the textarea and update text in Redux when editing is finished
//     const removeTextarea = () => {
//       dispatch(updateText({ id, updates: { content: textarea.value } }));
//       container.removeChild(textarea);
//       setEditingId(null);
//     };

//     textarea.addEventListener("keydown", (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         removeTextarea();
//       }
//     });

//     // Close the textarea if clicking outside
//     setTimeout(() => {
//       const handleClickOutside = (event) => {
//         if (!textarea.contains(event.target)) {
//           removeTextarea();
//           window.removeEventListener("click", handleClickOutside);
//         }
//       };
//       window.addEventListener("click", handleClickOutside);
//     });
//   };

//   return (
//     <Box sx={{ p: 1, position: "relative" }}>
//       <Typography variant="h6" sx={{ mb: 1 }}>
//         Add Text
//       </Typography>
//       <Typography variant="body2" sx={{ mb: 2 }}>
//         Click on a text type below to add it. Double-click on a text to edit it in place.
//       </Typography>

//       {/* Text Options */}
//       {[
//         { text: "Header 1", fontSize: 32, variant: "h4" },
//         { text: "Header 2", fontSize: 28, variant: "h5" },
//         { text: "Header 3", fontSize: 24, variant: "h6" },
//         { text: "Body Text", fontSize: 16, variant: "body1" },
//         { text: "Caption", fontSize: 12, variant: "caption" },
//       ].map(({ text, fontSize, variant }) => (
//         <Typography
//           key={text}
//           variant={variant}
//           sx={{
//             mb: 1,
//             pb: 1,
//             borderBottom: "1px solid #ddd",
//             cursor: "pointer",
//           }}
//           onClick={() => handleAddStyledText(text, fontSize)}
//         >
//           {text}
//         </Typography>
//       ))}

//       {/* Konva Canvas for rendering text */}
//       <Stage width={window.innerWidth} height={500} ref={stageRef}>
//         <Layer>
//           {Object.keys(texts).map((id) => {
//             const txt = texts[id];
//             return (
//               <Text
//                 key={id}
//                 text={txt.content}
//                 x={txt.x}
//                 y={txt.y}
//                 fontSize={txt.fontSize}
//                 fontFamily={txt.fontFamily}
//                 fontWeight={txt.fontWeight}
//                 fontStyle={txt.fontStyle}
//                 textDecoration={txt.textDecoration}
//                 textAlign={txt.textAlign}
//                 fill="black"
//                 draggable
//                 onDblClick={(e) => handleTextDblClick(e, id)}
//               />
//             );
//           })}
//         </Layer>
//       </Stage>

//       {/* Show the text formatting toolbar when a text is being edited */}
//       {editingId && <TextToolbar id={editingId} />}
//     </Box>
//   );
// };

// export default TextTab;


import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Stage, Layer, Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { addText, updateText } from "../redux/textSlice.js";
import TextToolbar from "./TextToolbar";

const TextTab = () => {
  const dispatch = useDispatch();
  // Use optional chaining to ensure we have a fallback object if state.text is undefined
  const texts = useSelector((state) => state.text?.textItems || {});
  const [editingId, setEditingId] = useState(null);
  const stageRef = useRef();
  const textareaRef = useRef();

  // Function to add new text using Redux
  const handleAddStyledText = (text, fontSize) => {
    const id = Date.now().toString();
    dispatch(
      addText({
        id,
        content: text,
        x: 50,
        y: 50,
        fontSize,
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        textAlign: "left"
      })
    );
  };

  // Enable inline editing with a textarea that appears at the text’s top-left corner
  const handleTextDblClick = (e, id) => {
    setEditingId(id);
    const textData = texts[id];
    const stage = stageRef.current.getStage();
    const container = stage.container();
    const absPos = e.target.getAbsolutePosition();

    // Create an editable textarea positioned at the top-left of the text element
    const textarea = document.createElement("textarea");
    textarea.value = textData.content;
    textarea.style.position = "absolute";
    textarea.style.top = `${absPos.y + container.offsetTop}px`;
    textarea.style.left = `${absPos.x + container.offsetLeft}px`;
    textarea.style.width = `${e.target.width() * 1.2}px`;
    textarea.style.height = `${e.target.height()}px`;
    textarea.style.fontSize = `${textData.fontSize}px`;
    textarea.style.fontFamily = textData.fontFamily;
    textarea.style.border = "1px solid #000";
    textarea.style.padding = "4px";
    textarea.style.margin = "0px";
    textarea.style.background = "white";
    textarea.style.color = "black";
    textarea.style.outline = "none";
    textarea.style.overflow = "hidden";
    textarea.style.whiteSpace = "nowrap";
    textarea.style.zIndex = "1000";

    container.appendChild(textarea);
    textarea.focus();
    textareaRef.current = textarea;

    // Remove the textarea and update text in Redux when editing is finished
    const removeTextarea = () => {
      dispatch(updateText({ id, updates: { content: textarea.value } }));
      container.removeChild(textarea);
      setEditingId(null);
    };

    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        removeTextarea();
      }
    });

    // Close the textarea if clicking outside
    setTimeout(() => {
      const handleClickOutside = (event) => {
        if (!textarea.contains(event.target)) {
          removeTextarea();
          window.removeEventListener("click", handleClickOutside);
        }
      };
      window.addEventListener("click", handleClickOutside);
    });
  };

  return (
    <Box sx={{ p: 1, position: "relative" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Add Text
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Click on a text type below to add it. Double-click on a text to edit it in place.
      </Typography>

      {/* Text Options */}
      {[
        { text: "Header 1", fontSize: 32, variant: "h4" },
        { text: "Header 2", fontSize: 28, variant: "h5" },
        { text: "Header 3", fontSize: 24, variant: "h6" },
        { text: "Body Text", fontSize: 16, variant: "body1" },
        { text: "Caption", fontSize: 12, variant: "caption" }
      ].map(({ text, fontSize, variant }) => (
        <Typography
          key={text}
          variant={variant}
          sx={{
            mb: 1,
            pb: 1,
            borderBottom: "1px solid #ddd",
            cursor: "pointer"
          }}
          onClick={() => handleAddStyledText(text, fontSize)}
        >
          {text}
        </Typography>
      ))}

      {/* Konva Canvas for rendering text */}
      <Stage width={window.innerWidth} height={500} ref={stageRef}>
        <Layer>
          {Object.keys(texts).map((id) => {
            const txt = texts[id];
            return (
              <Text
                key={id}
                text={txt.content}
                x={txt.x}
                y={txt.y}
                fontSize={txt.fontSize}
                fontFamily={txt.fontFamily}
                fontWeight={txt.fontWeight}
                fontStyle={txt.fontStyle}
                textDecoration={txt.textDecoration}
                textAlign={txt.textAlign}
                fill="black"
                draggable
                onDblClick={(e) => handleTextDblClick(e, id)}
              />
            );
          })}
        </Layer>
      </Stage>

      {/* Show the text formatting toolbar when a text is being edited */}
      {editingId && <TextToolbar id={editingId} />}
    </Box>
  );
};

export default TextTab;

