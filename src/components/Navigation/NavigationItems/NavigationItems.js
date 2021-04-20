import React from 'react'
import classes from './NavigationItems.css'
import { NavLink } from 'react-router-dom'

export default (props) => (
  <ul className={ classes.NavigationItems }>
    <li className={ classes.NavigationItem }>
      <NavLink exact activeClassName={ classes.active } to="/">Burger Builder</NavLink>
      <NavLink activeClassName={ classes.active } to="/orders">Orders</NavLink>
      <NavLink activeClassName={ classes.active } to="/auth">Sign up</NavLink>
    </li>
  </ul>
)