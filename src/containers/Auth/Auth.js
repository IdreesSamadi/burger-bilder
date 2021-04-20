import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validationRules: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validationRules: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      }
    }
  }

  checkValidity(rules, value) {
    let isValid = true
    if (!rules) {
      return true
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      isValid = pattern.test(value) && isValid
    }
    return isValid
  }

  inputChangeHandler = (event, controlName) => {
    const updateControls = {
      ...this.state.controls,
      [ controlName ]: {
        ...this.state.controls[ controlName ],
        value: event.target.value,
        valid: this.checkValidity(this.state.controls[ controlName ].validationRules, event.target.value,),
        touched: true
      }
    }
    this.setState({ controls: updateControls })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
  }
  render() {
    const formElementArray = []
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[ key ]
      })
    }
    const form = formElementArray.map(el => {
      return (
        <Input
          key={ el.id }
          invalid={ !el.config.valid }
          shouldValidate={ el.config.validationRules }
          touched={ el.config.touched }
          elementType={ el.config.elementType }
          elementConfig={ el.config.elementConfig }
          value={ el.config.value }
          changed={ (event) => this.inputChangeHandler(event, el.id) }
        />
      )
    })
    return (
      <div className={ classes.auth }>
        <form onSubmit={ this.submitHandler }>
          { form }
          <Button btnType="Success">Sign Up</Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth)