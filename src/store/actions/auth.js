import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApVaYuXWji0_M7JSpKF4BbjP_-PLa6_YA`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).then(response => {
      console.log(response)
      dispatch(authSuccess(response.data))
    }
    ).catch(err => {
      console.log(err)
      dispatch(authFail(err))
    })
  }
}
