import React from 'react'
import classes from './Input.css'

const input = (props) => {
  let inputElement = null
  const inputClasses = [ classes.inputElement ]
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.invalid)
  }
  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        onChange={ props.changed }
        className={ inputClasses.join(' ') }
        value={ props.value }
        { ...props.elementConfig }
      />
      break;
    case ('textarea'):
      inputElement = <textarea
        onChange={ props.changed }
        className={ inputClasses.join(' ') }
        value={ props.value }
        { ...props.elementConfig }
      />
      break;
    case ('select'):
      inputElement = (
        <select
          onChange={ props.changed }
          className={ inputClasses.join(' ') }
          value={ props.value }>
          {props.elementConfig.options.map(option => (
            <option key={ option.value } value={ option.value }>
              {option.displayValue }
            </option>
          )) }
        </select>
      )
      break
    default: inputElement = <input
      onChange={ props.changed }
      className={ inputClasses.join(' ') }
      value={ props.value }
      { ...props.elementConfig }
    />
  }
  return (
    <div className={ classes.input }>
      <label className={ classes.label }>{ props.label }</label>
      {inputElement }
    </div>
  )
}

export default input