import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  showSideDrawerHandler = () => {
    this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } })
  }
  render() {
    return (
      <Aux>
        <Toolbar drawerToggle={ this.showSideDrawerHandler } />
        <SideDrawer open={ this.state.showSideDrawer } closed={ this.sideDrawerCloseHandler } />
        <main className={ classes.content }> { this.props.children } </main>
      </Aux>
    )
  }
}

export default Layout;