import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary.js/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-info')
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary
            checkoutContinue={ this.checkoutContinueHandler }
            checkoutCancel={ this.checkoutCancelHandler }
            ingredients={ this.props.ings } />
          <Route path={ this.props.match.path + '/contact-info' } component={ ContactData } />
        </div>)
    }
    return summary
  }
}

const mapStateToProps = (state) => (
  {
    ings: state.burgerBuilder.ingredients
  }
)

export default connect(mapStateToProps)(Checkout) 