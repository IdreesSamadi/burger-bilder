import React, { Component } from "react"
import Aux from '../../hoc/Auxiliary'
import axios from '../../axios-order'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredient()
  }
  updatePurchasableState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => { return +sum + el }, 0)
    return sum > 0
  }

  purchaseModeHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }

  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[ key ] = disabledInfo[ key ] <= 0
    }
    let orderSummary = null

    let burger = this.props.error ? <p>Ingredients can't be loaded Please try again</p> : <Spinner />

    if (this.props.ings) {
      burger = <Aux>
        <Burger ingredients={ this.props.ings }></Burger>
        <BuildControls
          ingredientAdded={ this.props.onIngredientAdded }
          ingredientRemoved={ this.props.onIngredientRemoved }
          disabled={ disabledInfo }
          price={ this.props.price }
          purchasable={ this.updatePurchasableState(this.props.ings) }
          ordered={ this.purchaseModeHandler }
          isAuth={ this.props.isAuthenticated } />

      </Aux>

      orderSummary = <OrderSummary
        ingredients={ this.props.ings }
        purchaseCanceled={ this.purchaseCancelHandler }
        purchaseContinued={ this.purchaseContinueHandler }
        price={ this.props.price }
      />
    }
    return (
      <Aux>
        <Model show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
          { orderSummary }
        </Model>
        { burger }
      </Aux>
    )
  }
}
const mapStateToProps = (state) => (
  {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  })

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))