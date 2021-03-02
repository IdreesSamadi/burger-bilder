import * as actionTypes from './actionTypes'
import axios from '../../axios-order'


//action creator for add ingredient 
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
}

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  }
}

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED
  }
}

export const initIngredient = () => {
  return dispatch => {
    axios.get('https://buildbarger-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
      .then(response => {
        dispatch(setIngredient(response.data))
      })
      .catch(err => {
        dispatch(fetchIngredientFailed())
      })

  }
}