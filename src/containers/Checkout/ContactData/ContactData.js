import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
      country: ''
    }
  }

  orderHandler = () => {
    axios = 
  }

  render() {
    return (
      <div className={ classes.contactData }>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={ classes.input } type="text" name="name" placeholder="Your Name" />
          <input className={ classes.input } type="email" name="email" placeholder="Your Email" />
          <input className={ classes.input } type="text" name="street" placeholder="Street" />
          <input className={ classes.input } type="text" name="zipCode" placeholder="Your Postcode" />
          <input className={ classes.input } type="text" name="country" placeholder="Country" />
          <Button btnType="Success" clicked={ this.orderHandler }>ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData