import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const data = {
      email,
      password,
      returnSecureToken: true
    }
    let URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApVaYuXWji0_M7JSpKF4BbjP_-PLa6_YA'

    if (!isSignup) {
      URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApVaYuXWji0_M7JSpKF4BbjP_-PLa6_YA'
    }

    axios.post(URL, data).then(response => {
      console.log(response)
      dispatch(authSuccess(response.data.idToken, response.data.localId))
    }
    ).catch(err => {
      console.log(err)
      dispatch(authFail(err))
    })
  }
}
