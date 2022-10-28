import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initSocketConnection } from './utils/socket-io';
import './utils/moment-init';

const rootNode = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootNode,
);

initSocketConnection();
