import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary.js/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: {}
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    for (let param of query.entries()) {
      ingredients[ param[ 0 ] ] = +param[ 1 ]
    }
    this.setState({ ingredients: ingredients })
  }
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-info')
  }
  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutContinue={ this.checkoutContinueHandler }
          checkoutCancel={ this.checkoutCancelHandler }
          ingredients={ this.state.ingredients } />
        <Route path={ this.props.match.path + '/contact-info' } component={ ContactData } />
      </div>

    )
  }
}

export default Checkout