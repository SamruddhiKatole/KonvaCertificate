import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);







