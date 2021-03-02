import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'      // provider should wrap everything including the router
import { createStore, applyMiddleware, compose } from 'redux'
import burgerBuilder from './store/reducers/burgerBuilder'
import thunk from 'redux-thunk'

//for redux dev tools only
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(burgerBuilder, composeEnhancers(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
