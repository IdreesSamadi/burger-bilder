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
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
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
      const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000))
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', response.data.localId)
      dispatch(authSuccess(response.data.idToken, response.data.localId))
      dispatch(checkAuthTimeout(response.data.expiresIn))
    }
    ).catch(err => {
      let errorMessage
      if (err.response.data.error.message === 'INVALID_EMAIL') {
        errorMessage = 'Invalid Email - Please Provide a Valid Email'
      }
      else if (err.response.data.error.message === 'EMAIL_EXISTS') {
        errorMessage = 'Email Already in use - Please Use Another Email'
      }
      else if (err.response.data.error.message === 'INVALID_PASSWORD' ||
        err.response.data.error.message === 'EMAIL_NOT_FOUND') {
        errorMessage = 'Wrong Email or Password - Please Try Again'
      }
      else {
        errorMessage = 'Something Went Wrong - Please Try Again'
      }
      dispatch(authFail(errorMessage))
    })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logOut())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        dispatch(authSuccess(token, localStorage.getItem('userId')))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      } else {
        dispatch(logOut())
      }
    }
  }
}