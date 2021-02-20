import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'

class Model extends Component {
  //to avoid unnecessary rendering
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
  }
  render() {
    return (
      <Auxiliary>
        <Backdrop show={ this.props.show } clicked={ this.props.modalClosed }></Backdrop>
        <div
          className={ classes.something }
          style={ {
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : "0"
          } }
        >
          { this.props.children }
        </div>
      </Auxiliary>
    )
  }
}
export default Model