import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary.js/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

class Checkout extends Component {

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
          ingredients={ this.props.ings } />
        <Route path={ this.props.match.path + '/contact-info' } component={ ContactData } />
      </div>

    )
  }
}

const mapStateToProps = (state) => (
  {
    ings: state.ingredients
  }
)

export default connect(mapStateToProps)(Checkout) 