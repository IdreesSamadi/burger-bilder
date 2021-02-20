import React from 'react'
import logoImg from '../../assets/images/burger-logo.png'
import classes from './Logo.css'


export default (props) => (
  <div className={ classes.logo }>
    <img src={ logoImg } alt="myLOGo" />
  </div>
)