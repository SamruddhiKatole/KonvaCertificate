// // src/redux/textSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   textItems: {}, // key: id, value: text object
//   past: [],
//   future: [],
// };

// const textSlice = createSlice({
//   name: "text",
//   initialState,
//   reducers: {
//     addText: (state, action) => {
//       // Save current state for undo
//       state.past.push(JSON.parse(JSON.stringify(state.textItems)));
//       state.future = [];
//       const { id, ...data } = action.payload;
//       state.textItems[id] = data;
//     },
//     updateText: (state, action) => {
//       state.past.push(JSON.parse(JSON.stringify(state.textItems)));
//       state.future = [];
//       const { id, updates } = action.payload;
//       state.textItems[id] = { ...state.textItems[id], ...updates };
//     },
//     undo: (state) => {
//       if (state.past.length > 0) {
//         state.future.push(JSON.parse(JSON.stringify(state.textItems)));
//         state.textItems = state.past.pop();
//       }
//     },
//     redo: (state) => {
//       if (state.future.length > 0) {
//         state.past.push(JSON.parse(JSON.stringify(state.textItems)));
//         state.textItems = state.future.pop();
//       }
//     },
//   },
// });

// export const { addText, updateText, undo, redo } = textSlice.actions;
// export default textSlice.reducer;






import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textItems: {} // or [] if you prefer an array
};

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    addText: (state, action) => {
      const { id } = action.payload;
      state.textItems[id] = action.payload;
    },
    updateText: (state, action) => {
      const { id, updates } = action.payload;
      if (state.textItems[id]) {
        state.textItems[id] = { ...state.textItems[id], ...updates };
      }
    }
  }
});

export const { addText, updateText } = textSlice.actions;
export default textSlice.reducer;


