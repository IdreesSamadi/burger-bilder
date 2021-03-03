import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.2
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updateIngredient = { [ action.ingredientName ]: state.ingredients[ action.ingredientName ] + 1 }
      const updateIngredients = updateObject(state.ingredientName, updateIngredient)
      return updateObject(state, {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ]
      })
    case actionTypes.REMOVE_INGREDIENT:
      const updateIg = { [ action.ingredientName ]: state.ingredients[ action.ingredientName ] - 1 }
      const updateIgs = updateObject(state.ingredientName, updateIg)
      return updateObject(state, {
        ingredients: updateIgs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ action.ingredientName ]
      })
    case actionTypes.SET_INGREDIENT:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
      })
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return updateObject(state, {
        error: true
      })
    default:
      return state
  }
}

export default reducer