import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

import { connect } from 'react-redux'

class ContactData extends Component {
  state = {
    formData: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validationRules: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validationRules: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validationRules: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validationRules: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail'
        },
        value: '',
        validationRules: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          // TODO: validation rule for delivery method has bug, fix it
          options: [
            { value: 'fastest', displayValue: 'fastest' },
            { value: 'Cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validationRules: {},
        valid: true
      },
    },
    formIsValid: false
  }

  checkValidity(rules, value) {
    let isValid = true

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= 5 && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= 5 && isValid
    }

    // if (rules.isEmail) {
    //   const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //   isValid = pattern.test(value) && isValid
    // }
    return isValid
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {}
    for (let identifier in this.state.formData) {
      formData[ identifier ] = this.state.formData[ identifier ].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    this.props.onOrderBurger(order)
  }

  changeHandler = (event, inputIdentifier) => {
    const formCopy = { ...this.state.formData }
    const updatedFormElement = { ...formCopy[ inputIdentifier ] }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.validationRules,
      updatedFormElement.value
    )

    updatedFormElement.touched = true

    formCopy[ inputIdentifier ] = updatedFormElement;

    let formIsValid = true
    for (let identifier in formCopy) {
      formIsValid = formCopy[ identifier ].valid && formIsValid
    }
    this.setState({ formData: formCopy, formIsValid: formIsValid })
  }
  render() {
    const formElementArray = [];
    for (let key in this.state.formData) {
      formElementArray.push({
        id: key,
        config: this.state.formData[ key ]
      })
    }
    let form = (<form onSubmit={ this.orderHandler }>

      {formElementArray.map(el => (
        <Input
          key={ el.id }
          invalid={ !el.config.valid }
          shouldValidate={ el.config.validationRules }
          touched={ el.config.touched }
          elementType={ el.config.elementType }
          elementConfig={ el.config.elementConfig }
          value={ el.config.value }
          changed={ (event) => this.changeHandler(event, el.id) } />
      )) }
      <Button btnType="Success" disabled={ !this.state.formIsValid }>ORDER</Button>
    </form>)
    if (this.props.loading) {
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

const mapStateToProps = (state) => (
  {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))