import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(rootElement, document.getElementById('root'));
registerServiceWorker();
