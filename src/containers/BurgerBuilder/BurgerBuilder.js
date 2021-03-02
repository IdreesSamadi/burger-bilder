import React, { Component } from "react"
import axios from '../../axios-order'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as burgerBuilderAction from '../../store/actions/index'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://buildbarger-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   }).catch(err => this.setState({ error: true }))
  }

  updatePurchasableState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => { return +sum + el }, 0);
    return sum > 0
  }

  purchaseModeHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
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

    let burger = this.state.error ? <p>Ingredients can't be loaded Please try again</p> : <Spinner />

    if (this.props.ings) {
      burger = <Aux>
        <Burger ingredients={ this.props.ings }></Burger>
        <BuildControls
          ingredientAdded={ this.props.onIngredientAdded }
          ingredientRemoved={ this.props.onIngredientRemoved }
          disabled={ disabledInfo }
          price={ this.props.price }
          purchasable={ this.updatePurchasableState(this.props.ings) }
          ordered={ this.purchaseModeHandler } />
      </Aux>

      orderSummary = <OrderSummary
        ingredients={ this.props.ings }
        purchaseCanceled={ this.purchaseCancelHandler }
        purchaseContinued={ this.purchaseContinueHandler }
        price={ this.props.price }
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
const mapStateToProps = (state) => (
  { ings: state.ingredients, price: state.totalPrice }
)

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));