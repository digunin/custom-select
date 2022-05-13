import { useState } from 'react'

function Option({ value, text, onclick, isSelected = false }) {
  let className = isSelected ? 'option-selected' : ''
  return (
    <div
      className={className}
      onClick={() => onclick(value, text)}
      data-testid="single-option"
      value={value}
    >
      {text}
    </div>
  )
}

export default Option
