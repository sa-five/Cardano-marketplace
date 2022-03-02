import React from 'react';
import ReactDOM from 'react-dom';
import "../node_modules/font-awesome/css/font-awesome.min.css"; 
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import "./animated.css";
// import './style.css';
// import './style_grey.css';
import './assets/style.scss';
import './assets/style_grey.scss';

import App from './components/app';

//redux store
import { Provider } from 'react-redux'
import store from './store';

ReactDOM.render(
	<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
