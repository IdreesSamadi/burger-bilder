import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'

const Model = (props) => {
  return (
    <Auxiliary>
      <Backdrop show={ props.show } clicked={ props.modalClosed }></Backdrop>
      <div
        className={ classes.something }
        style={ {
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : "0"
        } }
      >
        { props.children }
      </div>
    </Auxiliary>
  )
}

export default Model