import React from 'react'
import classes from './NavigationItems.css'

export default (props) => (
  <ul className={ classes.NavigationItems }>
    <li className={ classes.NavigationItem }>
      <a href="/" className={ classes.active } active='true'>Burger Builder</a>
      <a href="/">Checkout</a>
    </li>
  </ul>
)