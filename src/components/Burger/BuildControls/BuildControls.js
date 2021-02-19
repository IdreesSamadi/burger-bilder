import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
  return (
    <div className={ classes.BuildControls }>
      <p>Price: <strong>{ props.price.toFixed(2) }</strong>$</p>
      {controls.map(control => <BuildControl
        added={ () => props.ingredientAdded(control.type) }
        removed={ () => props.ingredientRemoved(control.type) }
        label={ control.label }
        key={ control.label }
        disabled={ props.disabled[ control.type ] }
      />) }
    </div>
  )

}

export default buildControls