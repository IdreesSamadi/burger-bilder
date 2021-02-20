import React, { Component } from "react"

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.2
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchasableState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => { return +sum + el }, 0);
    this.setState({ purchasable: sum > 0 })
    console.log(this.state.purchasable)
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[ type ] + 1
    const updatedIngredients = { ...this.state.ingredients }

    updatedIngredients[ type ] = updatedCount
    const price = INGREDIENT_PRICES[ type ] + this.state.totalPrice
    this.setState({ totalPrice: price, ingredients: updatedIngredients })
    this.updatePurchasableState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[ type ] > 0) {
      const updatedCount = this.state.ingredients[ type ] - 1
      const updatedIngredients = { ...this.state.ingredients }

      updatedIngredients[ type ] = updatedCount
      const price = INGREDIENT_PRICES[ type ] - this.state.totalPrice
      this.setState({ totalPrice: price, ingredients: updatedIngredients })
      this.updatePurchasableState(updatedIngredients)
    }
  }

  purchaseModeHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('your continued!')
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[ key ] = disabledInfo[ key ] <= 0
    }
    return (
      <Aux>
        <Model show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
          <OrderSummary
            ingredients={ this.state.ingredients }
            purchaseCanceled={ this.purchaseCancelHandler }
            purchaseContinued={ this.purchaseContinueHandler }
            price={ this.state.totalPrice }
          />
        </Model>
        <Burger ingredients={ this.state.ingredients }></Burger>
        <BuildControls
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabled={ disabledInfo }
          price={ this.state.totalPrice }
          purchasable={ this.state.purchasable }
          ordered={ this.purchaseModeHandler } />
      </Aux>
    )
  }
}

export default BurgerBuilder;