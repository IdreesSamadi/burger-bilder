import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, withRouter, Switch } from 'react-router-dom'
import Order from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/index'


//TODO: fix the bug with routes

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
          <Route path='/orders' component={ Order } />
          <Route path='/' exact component={ BurgerBuilder } />
          <Route path='/checkout' component={ Checkout } />
          <Route path='/auth' component={ Auth } />
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
