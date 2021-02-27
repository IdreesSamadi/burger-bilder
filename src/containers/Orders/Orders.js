import React, { Component } from 'react'
import axiosOrder from '../../axios-order'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axiosOrder.get('/orders.json')
      .then(res => {
        const fetchOrder = []
        for (let key in res.data) {
          fetchOrder.push({ ...res.data[ key ], id: key })
        }
        this.setState({ loading: false, orders: fetchOrder })
      })
      .catch(err => {
        this.setState({ loading: false })
      })
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order =>
          <Order
            key={ order.id }
            ingredients={ order.ingredients }
            price={ +order.price }
          />
        ) }
      </div>
    )
  }
}
export default withErrorHandler(Orders, axiosOrder) 