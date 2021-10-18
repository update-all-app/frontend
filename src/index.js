import React from 'react';
import ReactDOM from 'react-dom';
import { debugContextDevtool } from 'react-context-devtool';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.initAutocomplete = null;

const container = document.getElementById('root');

ReactDOM.render(<App />, container);

debugContextDevtool(container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
