import React from 'react'
import classes from './NavigationItems.css'
import { NavLink } from 'react-router-dom'

export default (props) => (
  <ul className={ classes.NavigationItems }>
    <li className={ classes.NavigationItem }>
      <NavLink exact activeClassName={ classes.active } to="/">Burger Builder</NavLink>
      <NavLink activeClassName={ classes.active } to="/orders">Orders</NavLink>
      { !props.isAuthenticated ?
        <NavLink activeClassName={ classes.active } to="/auth">Sign up</NavLink> :
        <NavLink activeClassName={ classes.active } to="/logout">Log out</NavLink>
      }
    </li>
    <div>{ props.isAuthenticated }</div>
  </ul>
)