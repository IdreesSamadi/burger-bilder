import React, { Component } from "react"

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[ type ] + 1
    const updatedIngredients = { ...this.state.ingredients }

    updatedIngredients[ type ] = updatedCount
    const price = INGREDIENT_PRICES[ type ] + this.state.totalPrice
    this.setState({ totalPrice: price, ingredients: updatedIngredients })

  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[ type ] > 0) {
      const updatedCount = this.state.ingredients[ type ] - 1
      const updatedIngredients = { ...this.state.ingredients }

      updatedIngredients[ type ] = updatedCount
      const price = INGREDIENT_PRICES[ type ] - this.state.totalPrice
      this.setState({ totalPrice: price, ingredients: updatedIngredients })
    }
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
        <Burger ingredients={ this.state.ingredients }></Burger>
        <BuildControls
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabled={ disabledInfo }
          price={ this.state.totalPrice } />
      </Aux>
    )
  }
}

export default BurgerBuilder;