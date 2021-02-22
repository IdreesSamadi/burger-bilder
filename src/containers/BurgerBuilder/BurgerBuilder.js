import React, { Component } from "react"
import axios from '../../axios-order'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.2
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://buildbarger-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      }).catch(err => this.setState({ error: true }))
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
      const price = this.state.totalPrice - INGREDIENT_PRICES[ type ]
      console.log(INGREDIENT_PRICES[ type ])
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
    this.setState({ loading: true })
    axios.post('/order', {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "idrees",
        address: {
          street: 'test 01',
          zipCode: '23453',
          country: 'sweden'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    })
      .then(res => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }))
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[ key ] = disabledInfo[ key ] <= 0
    }
    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be loaded Please try again</p> : <Spinner />

    if (this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={ this.state.ingredients }></Burger>
        <BuildControls
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabled={ disabledInfo }
          price={ this.state.totalPrice }
          purchasable={ this.state.purchasable }
          ordered={ this.purchaseModeHandler } />
      </Aux>

      orderSummary = <OrderSummary
        ingredients={ this.state.ingredients }
        purchaseCanceled={ this.purchaseCancelHandler }
        purchaseContinued={ this.purchaseContinueHandler }
        price={ this.state.totalPrice }
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);