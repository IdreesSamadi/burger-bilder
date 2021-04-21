import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Toggle from '../SideDrawer/Toggle/Toggle'
import classes from './Toolbar.css'

const toolbar = (props) => {
  return (
    <header className={ classes.toolbar }>
      <Toggle clicked={ props.drawerToggle }></Toggle>
      <div className={ classes.Logo }>
        <Logo />
      </div>
      <nav className={ classes.DesktopOnly }>
        <NavigationItems isAuthenticated={ props.isAuth }></NavigationItems>
      </nav>
    </header>
  )
}
export default toolbar