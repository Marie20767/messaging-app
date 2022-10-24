import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import App from './App';

const rootNode = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootNode,
);

// TODO: move this into some kind of utils or appInit function later
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'now',
    ss: 'now',
    m: '%dmin',
    mm: '%dmin',
    h: '%d hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: '1 month ago',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});
