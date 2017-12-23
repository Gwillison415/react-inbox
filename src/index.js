
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import store from './store';
import {Router, indexRoute} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();


ReactDOM.render(
  <Router history = { history }>
    <Provider store={ store }>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')

)

registerServiceWorker();
