import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err))
      })

  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.get('/orders.json')
      .then(res => {
        const fetchOrder = []
        for (let key in res.data) {
          fetchOrder.push({ ...res.data[ key ], id: key })
        }
        dispatch(fetchOrdersSuccess(fetchOrder))
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })

  }
}