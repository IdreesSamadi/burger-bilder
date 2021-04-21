import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

export default (props) => {
  let attachClasses = [ classes.SideDrawer, classes.Close ]
  if (props.open) {
    attachClasses = [ classes.SideDrawer, classes.Open ]
  }
  return (
    <Auxiliary>
      <Backdrop show={ props.open } clicked={ props.closed }></Backdrop>
      <div onClick={ props.closed } className={ attachClasses.join(' ') }>
        <div className={ classes.Logo }>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={ props.isAuth } />
        </nav>
      </div>
    </Auxiliary>
  )
}