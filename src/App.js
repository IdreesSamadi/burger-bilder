import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route } from 'react-router-dom'
import Order from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'



class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/orders' component={ Order } />
          <Route path='/' exact component={ BurgerBuilder } />
          <Route path='/checkout' component={ Checkout } />
          <Route path='/auth' component={ Auth } />
        </Layout>
      </div>
    )
  }
}

export default App
