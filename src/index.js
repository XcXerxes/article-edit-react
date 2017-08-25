import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './router'
import '../build/polyfills'


ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
