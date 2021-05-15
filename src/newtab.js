import React from 'react';
import ReactDOM from 'react-dom';
import App from './newtab/App';

import setupGTAG from './gtag'

setupGTAG()

ReactDOM.render(
    <div className="app mt-5 mt-md-0 container-fluid">
        <App/>
    </div>,
  document.getElementById('root')
)
