import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary.js/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0
    for (let param of query.entries()) {
      if (param[ 0 ] === 'price') {
        price = param[ 1 ]
      }
      else {
        ingredients[ param[ 0 ] ] = +param[ 1 ]
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price })
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
        <Route path={ this.props.match.path + '/contact-info' } render={ (props) => (<ContactData ingredients={ this.state.ingredients } price={ this.state.totalPrice } { ...props } />) } />
      </div>

    )
  }
}

export default Checkout