import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'      // provider should wrap everything including the router
import { createStore } from 'redux'
import burgerBuilder from './store/reducers/burgerBuilder'

//second argument is for redux dev tools only
const store = createStore(burgerBuilder, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const app = (
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
