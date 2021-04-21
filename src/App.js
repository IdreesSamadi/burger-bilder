import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, withRouter } from 'react-router-dom'
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

//TODO: fix the bug with routes it causes memory leak

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthSignup()
  }
  render() {
    //   let routes = (
    //     <Switch>
    //       <Route path='/' exact component={ BurgerBuilder } />
    //       <Route path='/auth' component={ Auth } />
    //     </Switch>
    //   )
    //   if(this.props.isAuthenticate) {
    //     routes = (
    //       <Switch>
    //         <Route path='/orders' component={ Order } />
    //         <Route path='/checkout' component={ Checkout } />
    //         <Route path='/logout' component={ Logout } />
    //       </Switch>
    //     )
    //   }
    return (
      <div>
        <Layout>
          <Route path='/orders' component={ asyncOrder } />
          <Route path='/' exact component={ BurgerBuilder } />
          <Route path='/checkout' component={ asyncCheckout } />
          <Route path='/auth' component={ asyncAuth } />
          <Route path='/logout' component={ Logout } />
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
