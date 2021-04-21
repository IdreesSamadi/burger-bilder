import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})
const asyncOrder = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthSignup()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={ asyncAuth } />
        <Route path='/' exact component={ BurgerBuilder } />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticate) {
      routes = (
        <Switch>
          <Route path='/checkout' component={ asyncCheckout } />
          <Route path='/orders' component={ asyncOrder } />
          <Route path='/logout' component={ Logout } />
          <Route path='/auth' component={ asyncAuth } />
          <Route path='/' exact component={ BurgerBuilder } />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSignup: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
