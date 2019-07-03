/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

import styles from './css/index.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
