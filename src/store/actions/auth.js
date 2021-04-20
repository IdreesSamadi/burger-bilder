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

export const logOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut())
    }, expirationTime * 1000)
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
      dispatch(authSuccess(response.data.idToken, response.data.localId))
      dispatch(checkAuthTimeout(response.data.expiresIn))
    }
    ).catch(err => {
      let errorMessage
      if (err.response.data.error === 'INVALID_EMAIL') {
        errorMessage = 'Invalid Email - Please Provide a Valid Email'
      }
      else if (err.response.data.error === "EMAIL_EXISTS") {
        errorMessage = 'Email Already in use - Please Use Another Email'
      }
      else if (err.response.data.error === 'INVALID_PASSWORD') {
        errorMessage = 'Wrong Email or Password - Please Try Again'
      }
      else {
        errorMessage = 'Something Went Wrong - Please Try Again'
      }
      console.log(errorMessage)
      dispatch(authFail(errorMessage))
    })
  }
}
