function Option({ value, text, onclick, isSelected = false }) {
  let className = isSelected ? 'option-selected' : ''
  return (
    <div
      className={`option-element ${className}`}
      onClick={(e) => onclick(value, text, e.shiftKey)}
      data-testid="single-option"
      value={value}
    >
      {text}
    </div>
  )
}

export default Option
