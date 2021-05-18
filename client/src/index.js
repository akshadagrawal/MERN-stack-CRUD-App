import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './redux/configureStore'; 
import {
  BrowserRouter as Router
} from 'react-router-dom';


import App from './App';

ReactDOM.render(
  <Router>
    <Provider store= {store}>
      <App />
    </Provider>
  </Router>,
   
  document.getElementById('root')
);
