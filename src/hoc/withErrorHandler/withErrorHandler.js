import React, { Component } from 'react'
import Model from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      }, error => {
        this.setState({ error: error })
      })

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      })
    }

    //to avoid memory leak
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Auxiliary>
          <Model show={ this.state.error }
            modalClosed={ this.errorConfirmedHandler }>
            { this.state.error ? this.state.error.message : null }
          </Model>
          <WrappedComponent { ...this.props } />
        </Auxiliary>

      )
    }
  }
}

export default withErrorHandler