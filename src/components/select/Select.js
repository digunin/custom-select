import { useState } from 'react'
import Option from '../option/Option'
import useSelect from './useSelect'

function Select({ options = [], selectedValues = [], size = 5, onchange }) {
  const { selectedOptions, onclick } = useSelect(selectedValues, onchange)

  return (
    <div
      style={{
        height: `calc(${size} * var(--option-height)`,
        overflowY: 'auto',
      }}
      className="select-input"
      data-testid="select-testid"
    >
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
