function Option({ value, text, onclick, className }) {
  return (
    <div
      className={className}
      onClick={(e) => onclick(value, text, e.shiftKey)}
      data-testid="single-option"
      value={value}
    >
      {text}
    </div>
  )
}

export default Option
