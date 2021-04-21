import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { checkValidity } from '../../shared/utility'

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
    },
    isSignup: true
  }

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }


  inputChangeHandler = (event, controlName) => {
    const updateControls = {
      ...this.state.controls,
      [ controlName ]: {
        ...this.state.controls[ controlName ],
        value: event.target.value,
        valid: checkValidity(this.state.controls[ controlName ].validationRules, event.target.value,),
        touched: true
      }
    }
    this.setState({ controls: updateControls })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }
  render() {
    const formElementArray = []
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[ key ]
      })
    }
    let form = formElementArray.map(el => {
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

    if (this.props.loading) {
      form = <Spinner />
    }
    let errorMessage = null
    if (this.props.error) {
      errorMessage = (
        <p>{ this.props.error }</p>
      )
    }
    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={ this.props.authRedirectPath } />
    }
    return (
      <div className={ classes.auth }>
        {authRedirect }
        {errorMessage }
        <form onSubmit={ this.submitHandler }>
          { form }
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={ this.switchAuthModeHandler }
          btnType="Danger">SWITCH TO { this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }</Button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)