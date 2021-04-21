import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxiliary'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  componentDidMount = () => {
    console.log(this.props.token)
  }
  showSideDrawerHandler = () => {
    this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } })
  }
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={ this.props.token }
          drawerToggle={ this.showSideDrawerHandler }
        />
        <SideDrawer
          isAuth={ this.props.token }
          open={ this.state.showSideDrawer }
          closed={ this.sideDrawerCloseHandler }
        />
        <main className={ classes.content }> { this.props.children } </main>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => (
  {
    token: state.auth.token !== null
  }
)

export default connect(mapStateToProps)(Layout)