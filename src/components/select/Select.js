import { useState } from 'react'
import Option from '../option/Option'
import useSelect from './useSelect'

function Select({ options = [], selectedValues = [], onchange }) {
  const { selectedOptions, onclick } = useSelect(selectedValues, onchange)

  return (
    <div className="select-input" data-testid="select-testid">
      {options.map(({ value, text }, i) => {
        let selected = selectedOptions.includes(value)
        return (
          <Option
            key={`${i}-${value}`}
            value={value}
            text={text}
            onclick={onclick}
            isSelected={selected}
          />
        )
      })}
    </div>
  )
}

export default Select
