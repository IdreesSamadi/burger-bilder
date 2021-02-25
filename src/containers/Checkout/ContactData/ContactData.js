import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
      country: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true })
    axios.post('/orders.json', {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      .then(res => {
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch(err => this.setState({ loading: false }))
    console.log(this.props.ingredients)
  }

  render() {
    let form = (<form>
      <input className={ classes.input } type="text" name="name" placeholder="Your Name" />
      <input className={ classes.input } type="email" name="email" placeholder="Your Email" />
      <input className={ classes.input } type="text" name="street" placeholder="Street" />
      <input className={ classes.input } type="text" name="zipCode" placeholder="Your Postcode" />
      <input className={ classes.input } type="text" name="country" placeholder="Country" />
      <Button btnType="Success" clicked={ this.orderHandler }>ORDER</Button>
    </form>)
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={ classes.contactData }>
        <h4>Enter your Contact Data</h4>
        {form }
      </div>
    )
  }
}

export default ContactData